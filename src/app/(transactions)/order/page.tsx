import { getLocations, getMenuWithCategories } from "@/lib/data";

import { OrderForm } from "./order-form";

export default async function OrderPage() {
  const [locations, categories] = await Promise.all([
    getLocations(),
    getMenuWithCategories("old-town"),
  ]);

  const menuItems = categories.flatMap((category) =>
    category.menuItems.map((item) => ({
      slug: item.slug,
      name: item.name,
      price: Number(item.price ?? 0),
    }))
  );

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-neutral-900">Place an order</h1>
        <p className="text-sm text-neutral-500">
          Pay on site when you arrive. Need an invoice? Choose invoice-by-email and we’ll send it within 24 hours.
        </p>
      </header>
      <OrderForm
        locations={locations.map((location) => ({ slug: location.slug, name: location.name }))}
        menuItems={menuItems}
      />
    </div>
  );
}

