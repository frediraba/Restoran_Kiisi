import { NavigationLinkType, type NavigationLink } from "@prisma/client";

import { prisma } from "../prisma-client";

type NavigationGroups = {
  primary: NavigationLink[];
  secondary: NavigationLink[];
  mobile: NavigationLink[];
};

function isPrismaConnectionIssue(error: unknown): boolean {
  if (!error || typeof error !== "object") {
    return false;
  }

  const maybeError = error as { name?: string; code?: string };
  if (maybeError.name === "PrismaClientInitializationError") {
    return true;
  }

  return maybeError.code === "P1000" || maybeError.code === "P1001" || maybeError.code === "P1002";
}

async function runWithFallback<T>(query: () => Promise<T>, fallback: () => T): Promise<T> {
  try {
    return await query();
  } catch (error) {
    if (isPrismaConnectionIssue(error)) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`[data] Falling back to static dataset because database is unavailable: ${message}`);
      return fallback();
    }
    throw error;
  }
}

function createNavigationLink({
  id,
  label,
  type,
  href,
  priority,
  badge,
}: {
  id: string;
  label: string;
  type: NavigationLinkType;
  href: string;
  priority: number;
  badge?: string | null;
}): NavigationLink {
  const timestamp = new Date(0);
  return {
    id,
    label,
    type,
    href,
    icon: null,
    badge: badge ?? null,
    priority,
    isActive: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

function buildFallbackNavigation(): NavigationGroups {
  return {
    primary: [
      createNavigationLink({
        id: "fallback-nav-primary-menu",
        label: "Menu",
        type: NavigationLinkType.PRIMARY,
        href: "/menu",
        priority: 0,
      }),
      createNavigationLink({
        id: "fallback-nav-primary-order",
        label: "Order",
        type: NavigationLinkType.PRIMARY,
        href: "/order",
        priority: 1,
      }),
      createNavigationLink({
        id: "fallback-nav-primary-reserve",
        label: "Reserve",
        type: NavigationLinkType.PRIMARY,
        href: "/reserve",
        priority: 2,
        badge: "New",
      }),
      createNavigationLink({
        id: "fallback-nav-primary-locations",
        label: "Locations",
        type: NavigationLinkType.PRIMARY,
        href: "/locations",
        priority: 3,
      }),
      createNavigationLink({
        id: "fallback-nav-primary-contact",
        label: "Contact",
        type: NavigationLinkType.PRIMARY,
        href: "/contact",
        priority: 4,
      }),
    ],
    secondary: [
      createNavigationLink({
        id: "fallback-nav-secondary-offers",
        label: "Offers",
        type: NavigationLinkType.SECONDARY,
        href: "/offers",
        priority: 0,
      }),
      createNavigationLink({
        id: "fallback-nav-secondary-gift-cards",
        label: "Gift Cards",
        type: NavigationLinkType.SECONDARY,
        href: "/gift-cards",
        priority: 1,
      }),
      createNavigationLink({
        id: "fallback-nav-secondary-catering",
        label: "Catering",
        type: NavigationLinkType.SECONDARY,
        href: "/catering",
        priority: 2,
      }),
      createNavigationLink({
        id: "fallback-nav-secondary-events",
        label: "Events",
        type: NavigationLinkType.SECONDARY,
        href: "/events",
        priority: 3,
      }),
      createNavigationLink({
        id: "fallback-nav-secondary-careers",
        label: "Careers",
        type: NavigationLinkType.SECONDARY,
        href: "/careers",
        priority: 4,
      }),
      createNavigationLink({
        id: "fallback-nav-secondary-faq",
        label: "FAQ",
        type: NavigationLinkType.SECONDARY,
        href: "/faq",
        priority: 5,
      }),
      createNavigationLink({
        id: "fallback-nav-secondary-privacy",
        label: "Privacy",
        type: NavigationLinkType.SECONDARY,
        href: "/privacy",
        priority: 6,
      }),
      createNavigationLink({
        id: "fallback-nav-secondary-terms",
        label: "Terms",
        type: NavigationLinkType.SECONDARY,
        href: "/terms",
        priority: 7,
      }),
    ],
    mobile: [
      createNavigationLink({
        id: "fallback-nav-mobile-menu",
        label: "Menu",
        type: NavigationLinkType.MOBILE,
        href: "/menu",
        priority: 0,
      }),
      createNavigationLink({
        id: "fallback-nav-mobile-order",
        label: "Order",
        type: NavigationLinkType.MOBILE,
        href: "/order",
        priority: 1,
      }),
      createNavigationLink({
        id: "fallback-nav-mobile-reserve",
        label: "Reserve",
        type: NavigationLinkType.MOBILE,
        href: "/reserve",
        priority: 2,
      }),
      createNavigationLink({
        id: "fallback-nav-mobile-account",
        label: "Account",
        type: NavigationLinkType.MOBILE,
        href: "/account",
        priority: 3,
      }),
      createNavigationLink({
        id: "fallback-nav-mobile-locations",
        label: "Locations",
        type: NavigationLinkType.MOBILE,
        href: "/locations",
        priority: 4,
      }),
    ],
  };
}

export async function getNavigation() {
  return runWithFallback(
    async () => {
      const links = await prisma.navigationLink.findMany({
        orderBy: { priority: "asc" },
      });

      return {
        primary: links.filter((link) => link.type === "PRIMARY"),
        secondary: links.filter((link) => link.type === "SECONDARY"),
        mobile: links.filter((link) => link.type === "MOBILE"),
      };
    },
    buildFallbackNavigation,
  );
}

export async function getPromotions() {
  return runWithFallback(
    () =>
      prisma.promotion.findMany({
        where: { isActive: true },
        orderBy: { startAt: "desc" },
      }),
    () => [],
  );
}

export async function getMenuWithCategories(locationSlug: string) {
  const location = await runWithFallback(
    () =>
      prisma.restaurantLocation.findUnique({
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
      }),
    () => null,
  );

  if (!location) return [];

  return location.menuCategoryLinks
    .map((link) => link.menuCategory)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getLocations() {
  return runWithFallback(
    () =>
      prisma.restaurantLocation.findMany({
        include: {
          hours: true,
          reservationPolicy: true,
        },
        orderBy: { name: "asc" },
      }),
    () => [],
  );
}

export async function getLocationBySlug(slug: string) {
  return runWithFallback(
    () =>
      prisma.restaurantLocation.findUnique({
        where: { slug },
        include: {
          hours: true,
          reservationPolicy: true,
        },
      }),
    () => null,
  );
}

export async function getServiceHours(locationSlug: string) {
  const location = await runWithFallback(
    () =>
      prisma.restaurantLocation.findUnique({
        where: { slug: locationSlug },
        include: { hours: true },
      }),
    () => null,
  );
  return location?.hours ?? [];
}

export async function getReservationPolicy(locationSlug: string) {
  const location = await runWithFallback(
    () =>
      prisma.restaurantLocation.findUnique({
        where: { slug: locationSlug },
        include: { reservationPolicy: true },
      }),
    () => null,
  );
  return location?.reservationPolicy ?? null;
}

export async function getMenuItemBySlug(slug: string) {
  return runWithFallback(
    () => prisma.menuItem.findUnique({ where: { slug } }),
    () => null,
  );
}
