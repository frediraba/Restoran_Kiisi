"use server";

import { compare, hash } from "bcryptjs";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma-client";
import type { AccountFormState } from "./form-state";

const PASSWORD_PEPPER = process.env.NEXTAUTH_SECRET ?? "";

function withPepper(password: string) {
  return password + PASSWORD_PEPPER;
}

export async function updateProfileAction(
  _: AccountFormState,
  formData: FormData
): Promise<AccountFormState> {
  try {
    const profileId = String(formData.get("profileId"));
    const email = String(formData.get("email"));
    const firstName = formData.get("firstName") ? String(formData.get("firstName")) : null;
    const lastName = formData.get("lastName") ? String(formData.get("lastName")) : null;
    const phone = formData.get("phone") ? String(formData.get("phone")) : null;
    const defaultLocationSlug = formData.get("defaultLocation") ? String(formData.get("defaultLocation")) : null;
    const marketingOptIn = formData.get("marketingOptIn") === "on";
    const newPassword = formData.get("newPassword") ? String(formData.get("newPassword")) : "";

    const location = defaultLocationSlug
      ? await prisma.restaurantLocation.findUnique({ where: { slug: defaultLocationSlug } })
      : null;

    await prisma.guestProfile.update({
      where: { id: profileId },
      data: {
        email: email.toLowerCase(),
        firstName,
        lastName,
        phone,
        defaultLocationId: location?.id ?? null,
        marketingOptIn,
        ...(newPassword
          ? {
              passwordHash: await hash(withPepper(newPassword), 12),
            }
          : {}),
      },
    });

    return { status: "success" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update profile";
    return { status: "error", message };
  }
}



export async function signInAccountAction({ email, password }: { email: string; password: string }) {
  const normalizedEmail = email.toLowerCase();
  const user = await prisma.guestProfile.findUnique({ where: { email: normalizedEmail } });

  if (!user || !user.passwordHash) {
    return { ok: false, error: "ACCOUNT_NOT_FOUND" };
  }

  const isValid = await compare(withPepper(password), user.passwordHash);
  if (!isValid) {
    return { ok: false, error: "INVALID_CREDENTIALS" };
  }

  const cookieStore = await cookies();
  cookieStore.set("kiisi-session", normalizedEmail, { path: "/", httpOnly: true });
  return { ok: true };
}

export async function signUpAccountAction({ email, password }: { email: string; password: string }) {
  const normalizedEmail = email.toLowerCase();
  const existingProfile = await prisma.guestProfile.findUnique({ where: { email: normalizedEmail } });

  if (existingProfile && existingProfile.passwordHash) {
    return { ok: false, error: "ACCOUNT_EXISTS" };
  }

  const passwordHash = await hash(withPepper(password), 12);

  if (existingProfile) {
    await prisma.guestProfile.update({
      where: { id: existingProfile.id },
      data: { passwordHash },
    });
  } else {
    await prisma.guestProfile.create({
      data: {
        email: normalizedEmail,
        passwordHash,
      },
    });
  }

  const cookieStore = await cookies();
  cookieStore.set("kiisi-session", normalizedEmail, { path: "/", httpOnly: true });
  return { ok: true };
}

export async function signOutAccountAction() {
  const cookieStore = await cookies();
  cookieStore.delete("kiisi-session");
}
