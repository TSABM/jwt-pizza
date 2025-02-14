import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('a@jwt.coma');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'Email address' }).fill('a@jwt.com');
  await page.locator('div').filter({ hasText: 'Welcome back{"code":404,"' }).nth(2).click();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Admin' }).click();
  await expect(page.locator('#root div').filter({ hasText: 'Keep the dough rolling and' }).nth(3)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add Franchise' })).toBeVisible();
  await expect(page.getByRole('list')).toContainText('admin-dashboard');
  await page.getByRole('button', { name: 'Add Franchise' }).click();
  await expect(page.locator('form')).toContainText('Want to create franchise?');
  await expect(page.getByRole('button', { name: 'Create' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'franchise name' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'franchisee admin email' })).toBeVisible();
  await page.getByRole('link', { name: 'Franchise', exact: true }).click();
  await page.getByRole('link', { name: 'Franchise', exact: true }).click();
});