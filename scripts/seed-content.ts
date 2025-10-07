import { NavigationLinkType, PrismaClient, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";

const prisma = new PrismaClient();

function timeOfDay(hour: number, minute: number): Date {
  const date = new Date(Date.UTC(1970, 0, 1, hour, minute, 0));
  return date;
}

async function resetDatabase() {
  await prisma.locationMenuItem.deleteMany();
  await prisma.locationMenuCategory.deleteMany();
  await prisma.reservationRequest.deleteMany();
  await prisma.orderSession.deleteMany();
  await prisma.locationHours.deleteMany();
  await prisma.reservationPolicy.deleteMany();
  await prisma.navigationLink.deleteMany();
  await prisma.promotionOnItem.deleteMany();
  await prisma.promotionOnCategory.deleteMany();
  await prisma.promotion.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.menuCategory.deleteMany();
  await prisma.restaurantLocation.deleteMany();
}

async function seedLocations() {
  const location = await prisma.restaurantLocation.create({
    data: {
      slug: "old-town",
      name: "Restoran Kiisi - Old Town",
      address: {
        street: "Pikk 12",
        city: "Tallinn",
        country: "EE",
        postalCode: "10133",
      },
      phone: "+372 5555 1234",
      email: "oldtown@restorankiisi.ee",
      mapEmbedId: "restoran-kiisi-old-town",
      amenities: ["WiFi", "Terrace", "Wheelchair access"],
      preferredRegion: "iad1",
    },
  });

  const hours: Prisma.LocationHoursCreateManyInput[] = [];
  for (let day = 0; day < 7; day += 1) {
    hours.push({
      id: randomUUID(),
      locationId: location.id,
      dayOfWeek: day,
      openTime: timeOfDay(10, 0),
      closeTime: timeOfDay(22, 0),
      isClosed: day === 0,
    });
  }
  await prisma.locationHours.createMany({ data: hours });

  await prisma.reservationPolicy.create({
    data: {
      locationId: location.id,
      maxPartySize: 12,
      minPartySize: 1,
      bookingIntervalMinutes: 30,
      bufferMinutes: 10,
      waitlistEnabled: true,
    },
  });

  return location;
}

async function seedMenu(locationId: string) {
  const starters = await prisma.menuCategory.create({
    data: {
      slug: "starters",
      name: "Starters",
      description: "Kiisi signature beginnings",
      displayOrder: 1,
    },
  });
  const mains = await prisma.menuCategory.create({
    data: {
      slug: "mains",
      name: "Mains",
      description: "Hearty dishes from our kitchen",
      displayOrder: 2,
    },
  });
  const desserts = await prisma.menuCategory.create({
    data: {
      slug: "desserts",
      name: "Desserts",
      description: "Sweet endings",
      displayOrder: 3,
    },
  });

  const categories = [starters, mains, desserts];

  const itemsData = [
    {
      slug: "kiisi-burger",
      categoryId: mains.id,
      name: "Kiisi Burger",
      description: "Dry-aged beef, brioche, and house pickles",
      price: new Prisma.Decimal("15.90"),
      dietaryTags: ["gluten"],
      spiceLevel: "MEDIUM" as const,
    },
    {
      slug: "forest-mushroom-soup",
      categoryId: starters.id,
      name: "Forest Mushroom Soup",
      description: "Wild mushrooms, truffle cream, rye crumbs",
      price: new Prisma.Decimal("8.50"),
      dietaryTags: ["vegetarian"],
      spiceLevel: "MILD" as const,
    },
    {
      slug: "cloudberry-parfait",
      categoryId: desserts.id,
      name: "Cloudberry Parfait",
      description: "Nordic berries, white chocolate",
      price: new Prisma.Decimal("6.90"),
      dietaryTags: ["gluten-free"],
      spiceLevel: "MILD" as const,
    },
    {
      slug: "smoked-trout-toast",
      categoryId: starters.id,
      name: "Smoked Trout Toast",
      description: "Juniper-smoked trout, whipped butter, seed crumble",
      price: new Prisma.Decimal("12.40"),
      dietaryTags: ["pescatarian"],
      spiceLevel: "MILD" as const,
    },
    {
      slug: "charred-beet-salad",
      categoryId: starters.id,
      name: "Charred Beet Salad",
      description: "Coal-roasted beets, dill yogurt, toasted buckwheat",
      price: new Prisma.Decimal("11.20"),
      dietaryTags: ["vegan", "gluten-free"],
      spiceLevel: "MILD" as const,
    },
    {
      slug: "spruce-tip-broth",
      categoryId: starters.id,
      name: "Spruce Tip Broth",
      description: "Clarified vegetable broth infused with spruce tips",
      price: new Prisma.Decimal("9.80"),
      dietaryTags: ["vegan"],
      spiceLevel: "MILD" as const,
    },
    {
      slug: "rye-crusted-goat-cheese",
      categoryId: starters.id,
      name: "Rye-Crusted Goat Cheese",
      description: "Warm chèvre, fermented lingonberry glaze",
      price: new Prisma.Decimal("10.50"),
      dietaryTags: ["vegetarian"],
      spiceLevel: "MILD" as const,
    },
    {
      slug: "sea-buckthorn-ceviche",
      categoryId: starters.id,
      name: "Sea Buckthorn Ceviche",
      description: "Baltic whitefish cured in citrus and sea buckthorn",
      price: new Prisma.Decimal("13.60"),
      dietaryTags: ["pescatarian", "gluten-free"],
      spiceLevel: "MEDIUM" as const,
    },
    {
      slug: "herb-crusted-lamb",
      categoryId: mains.id,
      name: "Herb-Crusted Lamb",
      description: "Estonian lamb saddle, smoked garlic jus",
      price: new Prisma.Decimal("24.50"),
      dietaryTags: ["dairy"],
      spiceLevel: "MEDIUM" as const,
    },
    {
      slug: "celeriac-steak",
      categoryId: mains.id,
      name: "Celeriac Steak",
      description: "Roasted celeriac, hazelnut praline, fermented mushroom",
      price: new Prisma.Decimal("18.90"),
      dietaryTags: ["vegan", "gluten-free"],
      spiceLevel: "MILD" as const,
    },
    {
      slug: "baltic-cod-fillet",
      categoryId: mains.id,
      name: "Baltic Cod Fillet",
      description: "Poached cod, fennel pollen butter, sea herbs",
      price: new Prisma.Decimal("23.00"),
      dietaryTags: ["pescatarian", "gluten-free"],
      spiceLevel: "MILD" as const,
    },
    {
      slug: "wild-boar-ragout",
      categoryId: mains.id,
      name: "Wild Boar Ragout",
      description: "Hand-cut pappardelle, juniper braised wild boar",
      price: new Prisma.Decimal("21.50"),
      dietaryTags: ["gluten"],
      spiceLevel: "MEDIUM" as const,
    },
    {
      slug: "barley-risotto",
      categoryId: mains.id,
      name: "Barley Risotto",
      description: "Creamed pearl barley, roasted root vegetables, aged cheese",
      price: new Prisma.Decimal("17.40"),
      dietaryTags: ["vegetarian"],
      spiceLevel: "MILD" as const,
    },
    {
      slug: "smoked-duck-breast",
      categoryId: mains.id,
      name: "Smoked Duck Breast",
      description: "Cherrywood-smoked duck, charred cabbage, lingon glaze",
      price: new Prisma.Decimal("22.70"),
      dietaryTags: [],
      spiceLevel: "MEDIUM" as const,
    },
    {
      slug: "rye-honey-layer-cake",
      categoryId: desserts.id,
      name: "Rye Honey Layer Cake",
      description: "Spiced rye sponge, sour cream caramel",
      price: new Prisma.Decimal("8.10"),
      dietaryTags: ["gluten"],
      spiceLevel: "MILD" as const,
    },
    {
      slug: "sea-buckthorn-sorbet",
      categoryId: desserts.id,
      name: "Sea Buckthorn Sorbet",
      description: "Tart sea buckthorn, candied citrus peel",
      price: new Prisma.Decimal("7.20"),
      dietaryTags: ["vegan", "gluten-free"],
      spiceLevel: "MILD" as const,
    },
    {
      slug: "juniper-chocolate-torte",
      categoryId: desserts.id,
      name: "Juniper Chocolate Torte",
      description: "Flourless chocolate torte, juniper Chantilly",
      price: new Prisma.Decimal("8.80"),
      dietaryTags: ["nuts", "gluten-free"],
      spiceLevel: "MILD" as const,
    },
    {
      slug: "birch-sap-panna-cotta",
      categoryId: desserts.id,
      name: "Birch Sap Panna Cotta",
      description: "Vanilla panna cotta, birch sap gel, sorrel oil",
      price: new Prisma.Decimal("7.90"),
      dietaryTags: ["gluten-free"],
      spiceLevel: "MILD" as const,
    },
    {
      slug: "caramelized-bread-pudding",
      categoryId: desserts.id,
      name: "Caramelized Bread Pudding",
      description: "Toasted brioche, sea salt caramel, vanilla anglaise",
      price: new Prisma.Decimal("7.50"),
      dietaryTags: ["gluten"],
      spiceLevel: "MILD" as const,
    },
    {
      slug: "salted-caramel-kama",
      categoryId: desserts.id,
      name: "Salted Caramel Kama",
      description: "Whipped kama mousse, smoked salt caramel, honeycomb",
      price: new Prisma.Decimal("7.30"),
      dietaryTags: ["vegetarian"],
      spiceLevel: "MILD" as const,
    },
  ];

  const items = [] as Array<Awaited<ReturnType<typeof prisma.menuItem.create>>>;
  for (const data of itemsData) {
    const item = await prisma.menuItem.create({ data });
    items.push(item);
  }

  for (const category of categories) {
    await prisma.locationMenuCategory.create({
      data: {
        locationId,
        menuCategoryId: category.id,
      },
    });
  }

  for (const item of items) {
    await prisma.locationMenuItem.create({
      data: {
        locationId,
        menuItemId: item.id,
      },
    });
  }
}

async function seedPromotions() {
  await prisma.promotion.create({
    data: {
      title: "Autumn Tasting Menu",
      subtitle: "Four courses for two",
      body: "Experience the best of Kiisi seasonal dishes with our curated tasting menu.",
      startAt: new Date("2025-09-01T00:00:00.000Z"),
      endAt: new Date("2025-11-30T23:59:59.000Z"),
      audience: "PUBLIC",
      ctaLabel: "Book tasting",
      ctaUrl: "/reserve",
      isActive: true,
    },
  });
}

async function seedNavigation() {
  const primary = ["Menu", "Order", "Reserve", "Locations", "Contact"];
  const secondary = ["Offers", "Gift Cards", "Catering", "Events", "Careers", "FAQ", "Privacy", "Terms"];
  const mobile = ["Menu", "Order", "Reserve", "Account", "Locations"];

  const navigationData: Prisma.NavigationLinkCreateManyInput[] = [
    ...primary.map((label, index) => ({
      label,
      type: NavigationLinkType.PRIMARY,
      href: `/${label === "Menu" ? "menu" : label.toLowerCase()}`,
      priority: index,
    })),
    ...secondary.map((label, index) => ({
      label,
      type: NavigationLinkType.SECONDARY,
      href: `/${label.toLowerCase().replace(/\s+/g, "-")}`,
      priority: index,
    })),
    ...mobile.map((label, index) => ({
      label,
      type: NavigationLinkType.MOBILE,
      href: `/${label === "Menu" ? "menu" : label.toLowerCase()}`,
      priority: index,
    })),
  ];

  await prisma.navigationLink.createMany({
    data: navigationData,
  });
}

async function main() {
  console.info("?? Seeding Restoran Kiisi content...");
  await resetDatabase();
  const location = await seedLocations();
  await seedMenu(location.id);
  await seedPromotions();
  await seedNavigation();
  console.info("? Seed complete");
}

main()
  .catch((error) => {
    console.error("? Seed failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

