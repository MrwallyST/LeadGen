import { test, expect } from '@playwright/test';

test.describe('App Navigation and Lead Generator', () => {
  test('should login and navigate to Lead Generator and click buttons', async ({ page }) => {
    // Navigate to the app (assuming Vite dev server runs on 3000)
    await page.goto('/');

    // Wait for auth to complete or click mock login button
    const loginBtn = page.getByRole('button', { name: /Continue with Google/i });
    try {
      await loginBtn.waitFor({ state: 'visible', timeout: 5000 });
      await loginBtn.click();
    } catch (e) {
      // Mock auth might bypass login screen
    }

    // Verify we are on Dashboard
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    // Navigate to Lead Generator
    await page.getByRole('button', { name: /Lead Generator/i }).click();

    // Verify Lead Generator rendered
    await expect(page.getByRole('heading', { name: 'Target Acquisition' })).toBeVisible();

    // Click some buttons in Lead Generator
    await page.getByRole('button', { name: 'Manual Hunt' }).click();
    await page.getByRole('button', { name: 'Global Roulette' }).click();

    // Type in an input
    const nicheInput = page.getByPlaceholder('e.g. Plumber');
    await nicheInput.click();
    await nicheInput.fill('Electrician');

    // Start hunt (mocked or will error if no key, but tests the button click)
    await page.getByRole('button', { name: 'Hunt' }).first().click();

    // Should see an error about missing API key or a loading state
    // Just verify the app hasn't crashed
    const isHunting = await page.getByText('Deep Scraping Google Maps...').isVisible() ||
                      await page.getByText('Bypassing top results to find hidden gems in smaller cities...').isVisible();

    // Check if error modal/alert appears, dismiss it if so (browser alert)
    page.on('dialog', async dialog => {
      await dialog.accept();
    });

  });
});
