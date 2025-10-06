import { prisma } from "../prisma-client";

export async function getNavigation() {
  const links = await prisma.navigationLink.findMany({
    orderBy: { priority: "asc" },
  });

  return {
    primary: links.filter((link) => link.type === "PRIMARY"),
    secondary: links.filter((link) => link.type === "SECONDARY"),
    mobile: links.filter((link) => link.type === "MOBILE"),
  };
}

export async function getPromotions() {
  return prisma.promotion.findMany({
    where: { isActive: true },
    orderBy: { startAt: "desc" },
  });
}

export async function getMenuWithCategories(locationSlug: string) {
  const location = await prisma.restaurantLocation.findUnique({
    where: { slug: locationSlug },
    include: {
      menuCategoryLinks: {
        include: {
          menuCategory: {
            include: {
              menuItems: true,
            },
          },
        },
      },
    },
  });

  if (!location) return [];

  return location.menuCategoryLinks
    .map((link) => link.menuCategory)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getLocations() {
  return prisma.restaurantLocation.findMany({
    include: {
      hours: true,
      reservationPolicy: true,
    },
    orderBy: { name: "asc" },
  });
}

export async function getLocationBySlug(slug: string) {
  return prisma.restaurantLocation.findUnique({
    where: { slug },
    include: {
      hours: true,
      reservationPolicy: true,
    },
  });
}

export async function getServiceHours(locationSlug: string) {
  const location = await prisma.restaurantLocation.findUnique({
    where: { slug: locationSlug },
    include: { hours: true },
  });
  return location?.hours ?? [];
}

export async function getReservationPolicy(locationSlug: string) {
  const location = await prisma.restaurantLocation.findUnique({
    where: { slug: locationSlug },
    include: { reservationPolicy: true },
  });
  return location?.reservationPolicy ?? null;
}

export async function getMenuItemBySlug(slug: string) {
  return prisma.menuItem.findUnique({ where: { slug } });
}
