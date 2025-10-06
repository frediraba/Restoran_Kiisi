"use client";

import { useEffect, useMemo, useState, useTransition, useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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

type OrderFormProps = {
  locations: LocationOption[];
  menuItems: MenuItemOption[];
};

export function OrderForm({ locations, menuItems }: OrderFormProps) {
  const [state, action] = useActionState<OrderFormState>(createOrderAction, initialOrderFormState);
  const [selectedItemSlug, setSelectedItemSlug] = useState(menuItems[0]?.slug ?? "");
  const [quantity, setQuantity] = useState(1);
  const [requestedTime, setRequestedTime] = useState<string>(() => {
    const date = new Date();
    date.setHours(18, 0, 0, 0);
    return date.toISOString().slice(0, 16);
  });
  const [customTime, setCustomTime] = useState(false);
  const [pending, startTransition] = useTransition();

  const cartValue = useMemo(() => {
    const line: OrderLineInput = {
      menuItemId: selectedItemSlug,
      quantity,
    };
    return JSON.stringify([line]);
  }, [selectedItemSlug, quantity]);

  useEffect(() => {
    if (state.status === "success") {
      setQuantity(1);
    }
  }, [state]);

  return (
    <Card className="border-border/70 bg-card/95">
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

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="menuItem">Menu item</Label>
              <Select
                id="menuItem"
                name="menuItem"
                value={selectedItemSlug}
                onChange={(event) => setSelectedItemSlug(event.target.value)}
              >
                {menuItems.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name} — {currencyFormatter.format(item.price)}
                  </option>
                ))}
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min={1}
                max={10}
                value={quantity}
                onChange={(event) => setQuantity(Number.parseInt(event.target.value, 10) || 1)}
              />
            </div>
          </div>

          <input type="hidden" name="cart" value={cartValue} />

          <input
            type="hidden"
            name="requestedReadyAt"
            value={customTime && requestedTime ? new Date(requestedTime).toISOString() : ""}
          />

          <div className="grid gap-2">
            <Label htmlFor="requestedReadyAt">Requested ready at</Label>
            <Input
              id="requestedReadyAt"
              type="datetime-local"
              step={1800}
              value={requestedTime}
              onChange={(event) => {
                setRequestedTime(event.target.value);
                setCustomTime(true);
              }}
            />
          </div>

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

          <div className="rounded-3xl border border-dashed border-border/70 bg-muted/40 px-5 py-4 text-sm text-muted-foreground">
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
        <div className="flex items-center justify-end gap-3 border-t border-border/70 bg-muted/30 px-8 py-5">
          <Button
            type="submit"
            className="bg-transparent text-muted-foreground hover:bg-muted/60"
            variant="ghost"
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
