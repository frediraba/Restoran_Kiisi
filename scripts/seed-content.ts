import { PrismaClient, Prisma } from "@prisma/client";
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

  const kiisiBurger = await prisma.menuItem.create({
    data: {
      slug: "kiisi-burger",
      categoryId: mains.id,
      name: "Kiisi Burger",
      description: "Dry-aged beef, brioche, and house pickles",
      price: new Prisma.Decimal("15.90"),
      dietaryTags: ["gluten"],
      spiceLevel: "MEDIUM",
    },
  });

  const mushroomSoup = await prisma.menuItem.create({
    data: {
      slug: "forest-mushroom-soup",
      categoryId: starters.id,
      name: "Forest Mushroom Soup",
      description: "Wild mushrooms, truffle cream, rye crumbs",
      price: new Prisma.Decimal("8.50"),
      dietaryTags: ["vegetarian"],
      spiceLevel: "MILD",
    },
  });

  const cloudBerry = await prisma.menuItem.create({
    data: {
      slug: "cloudberry-parfait",
      categoryId: desserts.id,
      name: "Cloudberry Parfait",
      description: "Nordic berries, white chocolate",
      price: new Prisma.Decimal("6.90"),
      dietaryTags: ["gluten-free"],
      spiceLevel: "MILD",
    },
  });

  const items = [kiisiBurger, mushroomSoup, cloudBerry];

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

  await prisma.navigationLink.createMany({
    data: [
      ...primary.map((label, index) => ({
        label,
        type: "PRIMARY",
        href: `/${label === "Menu" ? "menu" : label.toLowerCase()}`,
        priority: index,
      })),
      ...secondary.map((label, index) => ({
        label,
        type: "SECONDARY",
        href: `/${label.toLowerCase().replace(/\s+/g, "-")}`,
        priority: index,
      })),
      ...mobile.map((label, index) => ({
        label,
        type: "MOBILE",
        href: `/${label === "Menu" ? "menu" : label.toLowerCase()}`,
        priority: index,
      })),
    ],
  });
}

async function main() {
  console.info("🌱 Seeding Restoran Kiisi content...");
  await resetDatabase();
  const location = await seedLocations();
  await seedMenu(location.id);
  await seedPromotions();
  await seedNavigation();
  console.info("✅ Seed complete");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

