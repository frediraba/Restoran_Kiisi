import { test, expect } from "@playwright/test";

test.describe("Account auth", () => {
  test("user can sign up, update profile, and sign out", async ({ page }) => {
    await page.goto("/account");
    await page.getByRole("textbox", { name: /email/i }).fill("demo@restorankiisi.ee");
    await page.getByLabel(/password/i).fill("ChangeMe!23");
    await page.getByRole("button", { name: /sign in/i }).click();

    // Wait for redirect to account page after sign in
    await page.waitForURL("/account*");
    
    // Take a screenshot for debugging
    await page.screenshot({ path: 'debug-account-page.png' });
    
    // Check if we're on the account page by looking for the welcome message
    await expect(page.getByText(/welcome back, demo/i)).toBeVisible();

    await page.getByRole("textbox", { name: /first name/i }).fill("Demo");
    await page.getByRole("textbox", { name: /last name/i }).fill("User");
    await page.getByRole("button", { name: /save profile/i }).click();

    await expect(page.getByText(/profile updated successfully/i)).toBeVisible();

    await page.getByRole("button", { name: /sign out/i }).click();
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
  });
});
