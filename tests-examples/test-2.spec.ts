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

test('test2', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('a@jwt.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.getByRole('cell', { name: 'testFranchise', exact: true }).click();
  await page.getByRole('cell', { name: 'testFranchise', exact: true }).click();
  await page.getByRole('columnheader', { name: 'Franchisee' }).click();
  await page.getByRole('link', { name: '常' }).click();
  await page.goto('http://localhost:5173/admin-dashboard');
  await page.goto('http://localhost:5173/admin-dashboard');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('row', { name: '0i20r9lm7xTestFranchise' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Add Franchise' }).click();
  await page.getByRole('textbox', { name: 'franchise name' }).click();
  await page.getByRole('textbox', { name: 'franchise name' }).fill('testFranchise');
  await page.getByRole('textbox', { name: 'franchisee admin email' }).click();
  await page.getByRole('textbox', { name: 'franchisee admin email' }).fill('testFranchise@jwt.com');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('button', { name: 'Create' }).click();
})

test("test3", async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('a@jwt.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('link', { name: 'Admin' }).click();

  await page.getByRole('button', { name: 'Add Franchise' }).click();
  await page.getByRole('textbox', { name: 'franchise name' }).click();
  await page.getByRole('textbox', { name: 'franchise name' }).fill('test2');
  await page.getByRole('textbox', { name: 'franchisee admin email' }).click();
  await page.getByRole('textbox', { name: 'franchisee admin email' }).fill('test2@jwt.com');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.getByRole('button', { name: 'Add Franchise' }).click();
  await page.getByRole('textbox', { name: 'franchise name' }).click();
  await page.getByRole('textbox', { name: 'franchise name' }).fill('test3');
  await page.getByRole('textbox', { name: 'franchisee admin email' }).click();
  await page.getByRole('textbox', { name: 'franchisee admin email' }).fill('a@jwt.com');
  await page.getByRole('button', { name: 'Create' }).click();

  await page.getByRole('cell', { name: 'test3' }).click();

  await page.getByRole('row', { name: 'v90xakbcfnTestFranchise' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.getByRole('row', { name: 'test3 常用名字 Close' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Close' }).click();
})