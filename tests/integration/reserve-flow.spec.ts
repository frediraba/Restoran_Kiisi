import { test, expect } from "@playwright/test";

test.describe("Reservation flow", () => {
  test("shows nearest slot when requested time unavailable", async ({ page }) => {
    await page.goto("/reserve");
    await page.getByRole("combobox", { name: /location/i }).selectOption("old-town");
    await page.getByRole("spinbutton", { name: /party size/i }).fill("8");
    await page.getByTestId("reservation-datetime").fill("2025-10-04T21:00");
    await page.getByRole("textbox", { name: /name/i }).fill("Sofia");
    await page.getByRole("textbox", { name: /email/i }).fill("sofia@example.com");
    await page.getByRole("button", { name: /find table/i }).click();

    await expect(page.getByText(/next available slots/i)).toBeVisible();
  });

  test("guest can confirm reservation", async ({ page }) => {
    await page.goto("/reserve");
    await page.getByRole("combobox", { name: /location/i }).selectOption("old-town");
    await page.getByRole("spinbutton", { name: /party size/i }).fill("4");
    await page.getByTestId("reservation-datetime").fill("2025-10-04T18:30");
    await page.getByRole("textbox", { name: /name/i }).fill("Ville");
    await page.getByRole("textbox", { name: /email/i }).fill("ville@example.com");
    await page.getByRole("button", { name: /confirm/i }).click();

    await expect(page.getByText(/reservation.*confirmed/i)).toBeVisible();
  });
});
