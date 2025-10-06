"use client";

import { useEffect, useMemo, useState, useTransition, useActionState } from "react";

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
    <form
      action={(formData) => {
        startTransition(() => {
          action(formData);
        });
      }}
      className="mx-auto grid max-w-3xl gap-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-2">
        <label className="text-sm font-medium text-neutral-700" htmlFor="location">
          Location
        </label>
        <select
          id="location"
          name="location"
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
          required
          defaultValue={locations[0]?.slug ?? ""}
        >
          {locations.map((location) => (
            <option key={location.slug} value={location.slug}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-neutral-700" htmlFor="serviceType">
          Service type
        </label>
        <select
          id="serviceType"
          name="serviceType"
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
          defaultValue="pickup"
        >
          <option value="pickup">Pickup</option>
          <option value="dine-in">Dine in</option>
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-neutral-700" htmlFor="menuItem">
            Menu item
          </label>
          <select
            id="menuItem"
            className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            value={selectedItemSlug}
            onChange={(event) => setSelectedItemSlug(event.target.value)}
          >
            {menuItems.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name} - {currencyFormatter.format(item.price)}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-neutral-700" htmlFor="quantity">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            min={1}
            max={10}
            className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
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
        <label className="text-sm font-medium text-neutral-700" htmlFor="requestedReadyAt">
          Requested ready at
        </label>
        <input
          id="requestedReadyAt"
          type="datetime-local"
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
          value={requestedTime}
          onChange={(event) => {
            setRequestedTime(event.target.value);
            setCustomTime(true);
          }}
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-neutral-700" htmlFor="paymentMode">
          Payment option
        </label>
        <select
          id="paymentMode"
          name="paymentMode"
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
          defaultValue="pay_on_site"
        >
          <option value="pay_on_site">Pay at counter</option>
          <option value="invoice_email">Invoice by email</option>
        </select>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-neutral-700" htmlFor="name">
          Contact name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-neutral-700" htmlFor="email">
          Contact email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-neutral-700" htmlFor="phone">
          Contact phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-neutral-700" htmlFor="specialInstructions">
          Special instructions
        </label>
        <textarea
          id="specialInstructions"
          name="specialInstructions"
          rows={3}
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
        />
      </div>

      <div className="flex items-center justify-between rounded-lg bg-neutral-50 px-4 py-3 text-sm text-neutral-600">
        <p>
          Service hours are enforced. Orders outside opening times will receive the next available slot or an error.
        </p>
      </div>

      {state.status === "error" ? (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
        >
          {state.message}
        </div>
      ) : null}
      {state.status === "success" ? (
        <div
          role="status"
          aria-live="polite"
          className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
        >
          <p className="font-semibold">Order {state.orderId} confirmed.</p>
          <p>{state.instructions}</p>
        </div>
      ) : null}

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-700 disabled:opacity-60"
        disabled={pending}
      >
        {pending ? "SubmittingÃ¢â‚¬Â¦" : "Submit order"}
      </button>
    </form>
  );
}



