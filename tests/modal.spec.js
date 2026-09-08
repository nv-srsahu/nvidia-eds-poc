import { expect, test } from '@playwright/test';

test('modal loads decorated fragment blocks', async ({ page }) => {
  await page.goto('/modal.html');
  await page.getByRole('button', { name: 'Open deployment form' }).click();

  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('dialog').locator('.input-shell input')).toHaveAttribute(
    'placeholder',
    'gpt4-customer-support-v2',
  );
  await expect(page.getByRole('dialog').getByRole('heading', { name: 'About Us' })).toBeVisible();
  await expect(page.getByRole('dialog').getByAltText('NVIDIA headquarters')).toBeVisible();
});
