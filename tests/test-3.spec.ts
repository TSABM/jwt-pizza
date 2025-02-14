import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  
  await page.getByRole('textbox', { name: 'Email address' }).fill('test@test.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();

  //await page.getByRole('button', { name: 'Create store' }).click();
  //await page.getByRole('textbox', { name: 'store name' }).click();
  //await page.getByRole('textbox', { name: 'store name' }).fill('testStore1');
  //await page.getByRole('button', { name: 'Create' }).click();

  await page.getByRole('button', { name: 'Create store' }).click();
  await page.getByRole('textbox', { name: 'store name' }).click();
  await page.getByRole('textbox', { name: 'store name' }).fill('testStore2');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('row', { name: 'testStore2 0 ₿ Close' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Close' }).click();
});