import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
    })),
  );

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-6 py-12">
      <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-white via-primary/10 to-white">
        <CardContent className="relative space-y-4 p-10">
          <div className="pointer-events-none absolute -right-20 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-primary/25 blur-3xl" aria-hidden />
          <Badge variant="outline">Pickup & dine-in</Badge>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Place an order</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Pay on site when you arrive. Need an invoice? Choose invoice-by-email and we’ll send it within 24 hours.
          </p>
        </CardContent>
      </Card>
      <OrderForm
        locations={locations.map((location) => ({ slug: location.slug, name: location.name }))}
        menuItems={menuItems}
      />
    </div>
  );
}
