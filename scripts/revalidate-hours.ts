import { prisma } from "@/lib/prisma-client";

async function main() {
  const locations = await prisma.restaurantLocation.findMany({ select: { slug: true } });
  locations.forEach((location) => {
    console.info(`[revalidate] reservation-window:${location.slug}`);
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });