import { hash } from "bcryptjs";

import { prisma } from "@/lib/prisma-client";

const PASSWORD_PEPPER = process.env.NEXTAUTH_SECRET ?? "";

async function main() {
  const email = "demo@restorankiisi.ee";
  const existing = await prisma.guestProfile.findUnique({ where: { email } });
  if (existing) {
    return;
  }

  const passwordHash = await hash("ChangeMe!23" + PASSWORD_PEPPER, 12);

  await prisma.guestProfile.create({
    data: {
      email,
      passwordHash,
      firstName: "Demo",
      lastName: "User",
      marketingOptIn: true,
    },
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
