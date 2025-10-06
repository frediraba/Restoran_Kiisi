"use client";

import { useEffect, useMemo, useRef, useState, useTransition, useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  DateTimePickerField,
  getDefaultLocalValue,
  toISOStringFromLocalInput,
} from "@/components/date-time-picker";
import { createOrderAction, type OrderLineInput } from "./actions";
import { initialOrderFormState, type OrderFormState } from "./form-state";

const currencyFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR" });

type LocationOption = {
  slug: string;
  name: string;
};

type MenuItemOption = {
  slug: string;
  name: string;
  price: number;
};

type OrderLineState = {
  id: number;
  menuItemId: string;
  quantity: number;
};

type OrderFormProps = {
  locations: LocationOption[];
  menuItems: MenuItemOption[];
};

export function OrderForm({ locations, menuItems }: OrderFormProps) {
  const [state, action] = useActionState<OrderFormState>(createOrderAction, initialOrderFormState);
  const [lines, setLines] = useState<OrderLineState[]>(() => {
    if (menuItems.length === 0) {
      return [];
    }
    return [
      {
        id: 0,
        menuItemId: menuItems[0]!.slug,
        quantity: 1,
      },
    ];
  });
  const nextLineId = useRef(lines.length);
  const defaultReadyAt = useMemo(() => getDefaultLocalValue(18, 0), []);
  const [requestedTime, setRequestedTime] = useState<string>(defaultReadyAt);
  const [customTime, setCustomTime] = useState(false);
  const [pending, startTransition] = useTransition();

  const quickPicks = useMemo(
    () => [
      {
        id: "asap",
        label: "As soon as possible",
        description: "We\'ll confirm the earliest available slot.",
        value: "",
      },
      {
        id: "evening",
        label: "Today · 6:00 PM",
        description: "Great for dinner pickups.",
        value: defaultReadyAt,
      },
      {
        id: "custom",
        label: "Custom time",
        description: "Pick a date and time below.",
        value: requestedTime,
      },
    ],
    [defaultReadyAt, requestedTime],
  );

  const [activeQuickPickId, setActiveQuickPickId] = useState<string | null>("asap");

  const cartValue = useMemo(() => {
    const cartLines: OrderLineInput[] = lines
      .filter((line) => line.menuItemId)
      .map((line) => ({
        menuItemId: line.menuItemId,
        quantity: Math.max(1, Math.min(10, Number.isFinite(line.quantity) ? line.quantity : 1)),
      }));
    return JSON.stringify(cartLines);
  }, [lines]);

  useEffect(() => {
    if (state.status === "success") {
      if (menuItems.length === 0) {
        setLines([]);
        nextLineId.current = 0;
        return;
      }
      setLines([
        {
          id: 0,
          menuItemId: menuItems[0]!.slug,
          quantity: 1,
        },
      ]);
      nextLineId.current = 1;
    }
  }, [menuItems, state]);

  useEffect(() => {
    setLines((previous) => {
      if (menuItems.length === 0) {
        nextLineId.current = 0;
        return [];
      }
      if (previous.length === 0) {
        nextLineId.current = 1;
        return [
          {
            id: 0,
            menuItemId: menuItems[0]!.slug,
            quantity: 1,
          },
        ];
      }
      const available = new Set(menuItems.map((item) => item.slug));
      let changed = false;
      const normalized = previous.map((line) => {
        if (!available.has(line.menuItemId)) {
          changed = true;
          return { ...line, menuItemId: menuItems[0]!.slug };
        }
        return line;
      });
      return changed ? normalized : previous;
    });
  }, [menuItems]);

  const handleAddLine = () => {
    if (menuItems.length === 0) {
      return;
    }
    setLines((previous) => [
      ...previous,
      {
        id: nextLineId.current,
        menuItemId: menuItems[0]!.slug,
        quantity: 1,
      },
    ]);
    nextLineId.current += 1;
  };

  const handleRemoveLine = (lineId: number) => {
    setLines((previous) => {
      if (previous.length <= 1) {
        return previous;
      }
      return previous.filter((line) => line.id !== lineId);
    });
  };

  const handleMenuItemChange = (lineId: number, menuItemId: string) => {
    setLines((previous) =>
      previous.map((line) => (line.id === lineId ? { ...line, menuItemId } : line)),
    );
  };

  const handleQuantityChange = (lineId: number, nextQuantity: number) => {
    const sanitized = Number.isNaN(nextQuantity) ? 1 : Math.max(1, Math.min(10, nextQuantity));
    setLines((previous) =>
      previous.map((line) => (line.id === lineId ? { ...line, quantity: sanitized } : line)),
    );
  };

  return (
    <Card className="border-primary/15 bg-white/95">
      <form
        action={(formData) => {
          startTransition(() => {
            action(formData);
          });
        }}
        className="grid gap-6"
      >
        <CardContent className="grid gap-6 p-8">
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Select id="location" name="location" required defaultValue={locations[0]?.slug ?? ""}>
              {locations.map((location) => (
                <option key={location.slug} value={location.slug}>
                  {location.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="serviceType">Service type</Label>
            <Select id="serviceType" name="serviceType" defaultValue="pickup">
              <option value="pickup">Pickup</option>
              <option value="dine-in">Dine in</option>
            </Select>
          </div>

          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label>Order items</Label>
              <Button type="button" variant="outline" size="sm" onClick={handleAddLine} disabled={menuItems.length === 0}>
                Add menu item
              </Button>
            </div>
            <div className="grid gap-3">
              {lines.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-primary/20 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
                  No menu items available right now.
                </p>
              ) : null}
              {lines.map((line, index) => (
                <div
                  key={line.id}
                  className="grid gap-3 rounded-2xl border border-primary/15 bg-white/80 p-4 md:grid-cols-[minmax(0,1fr)_120px_auto] md:items-end"
                >
                  <div className="grid gap-2">
                    <Label htmlFor={`menuItem-${line.id}`}>Menu item {lines.length > 1 ? index + 1 : ""}</Label>
                    <Select
                      id={`menuItem-${line.id}`}
                      value={line.menuItemId}
                      onChange={(event) => handleMenuItemChange(line.id, event.target.value)}
                    >
                      {menuItems.map((item) => (
                        <option key={item.slug} value={item.slug}>
                          {item.name} — {currencyFormatter.format(item.price)}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`quantity-${line.id}`}>Quantity</Label>
                    <Input
                      id={`quantity-${line.id}`}
                      type="number"
                      min={1}
                      max={10}
                      value={line.quantity}
                      onChange={(event) =>
                        handleQuantityChange(line.id, Number.parseInt(event.target.value, 10) || 1)
                      }
                    />
                  </div>
                  <div className="flex items-end justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-primary/70 hover:text-primary"
                      size="sm"
                      onClick={() => handleRemoveLine(line.id)}
                      disabled={lines.length <= 1}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <input type="hidden" name="cart" value={cartValue} />

          <input
            type="hidden"
            name="requestedReadyAt"
            value={customTime ? toISOStringFromLocalInput(requestedTime) : ""}
          />

          <DateTimePickerField
            id="requestedReadyAt"
            label="Requested ready at"
            value={requestedTime}
            onChange={(nextValue) => {
              setRequestedTime(nextValue);
              setCustomTime(true);
              setActiveQuickPickId("custom");
            }}
            description="Choose when you\'d like your order to be ready."
            quickPicks={quickPicks}
            onQuickPick={(pick) => {
              setActiveQuickPickId(pick.id);
              if (pick.id === "asap") {
                setCustomTime(false);
                setRequestedTime(defaultReadyAt);
                return;
              }
              setCustomTime(true);
              if (pick.value) {
                setRequestedTime(pick.value);
              } else {
                setRequestedTime(defaultReadyAt);
              }
            }}
            activeQuickPickId={activeQuickPickId}
          />

          <div className="grid gap-2">
            <Label htmlFor="paymentMode">Payment option</Label>
            <Select id="paymentMode" name="paymentMode" defaultValue="pay_on_site">
              <option value="pay_on_site">Pay at counter</option>
              <option value="invoice_email">Invoice by email</option>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Contact name</Label>
            <Input id="name" name="name" type="text" autoComplete="name" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Contact email</Label>
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Contact phone</Label>
            <Input id="phone" name="phone" type="tel" autoComplete="tel" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="specialInstructions">Special instructions</Label>
            <Textarea id="specialInstructions" name="specialInstructions" rows={3} />
          </div>

          <div className="rounded-3xl border border-dashed border-primary/20 bg-primary/5 px-5 py-4 text-sm text-muted-foreground">
            Service hours are enforced. Orders outside opening times will receive the next available slot or an error.
          </div>

          {state.status === "error" ? (
            <div
              role="alert"
              aria-live="assertive"
              className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700"
            >
              {state.message}
            </div>
          ) : null}
          {state.status === "success" ? (
            <div
              role="status"
              aria-live="polite"
              className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700"
            >
              <p className="font-semibold">Order {state.orderId} confirmed.</p>
              <p>{state.instructions}</p>
            </div>
          ) : null}
        </CardContent>
        <div className="flex items-center justify-end gap-3 border-t border-primary/15 bg-primary/5 px-8 py-5">
          <Button
            type="submit"
            className="bg-white/70 text-primary hover:bg-primary/10"
            variant="outline"
            name="intent"
            value="check"
            disabled={pending}
          >
            {pending ? "Checking…" : "Check availability"}
          </Button>
          <Button type="submit" name="intent" value="confirm" disabled={pending}>
            {pending ? "Submitting…" : "Submit order"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
