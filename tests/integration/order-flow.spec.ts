import { test, expect } from "@playwright/test";

test.describe("Order flow", () => {
  test("guest can place pay-on-site pickup order", async ({ page }) => {
    await page.goto("/order");
    await page.getByRole("combobox", { name: /location/i }).selectOption("old-town");
    await page.getByRole("spinbutton", { name: /quantity/i }).fill("2");
    await page.getByRole("textbox", { name: /email/i }).fill("guest@example.com");
    await page.getByRole("button", { name: /submit order/i }).click();

    await expect(page.getByText(/pay on site/i)).toBeVisible();
  });

  test("guest can request invoice-by-email", async ({ page }) => {
    await page.goto("/order");
    await page.getByRole("combobox", { name: /payment/i }).selectOption("invoice_email");
    await page.getByRole("textbox", { name: /email/i }).fill("invoice@example.com");
    await page.getByRole("button", { name: /submit order/i }).click();

    await expect(page.getByText(/invoice sent to/i)).toBeVisible();
  });
});
