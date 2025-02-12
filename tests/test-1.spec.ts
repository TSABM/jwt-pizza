import { test, expect } from '@playwright/test';



test.beforeEach('register', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByRole('textbox', { name: 'Full name' }).fill('testName');
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('testName@test.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('test');
  await page.getByRole('button', { name: 'Register' }).click();
  //await page.getByRole('button', { name: 'Register' }).click();
});

//test.afterEach("logout", async ({page})=>{
  //await page.goto('http://localhost:5173/');
  //await page.getByRole('link', { name: 'Logout' }).click();
  //await page.getByRole('link', { name: 'Logout' }).click();
//})


test("logout - login", async ({page}) =>{
  //await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Logout' }).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('testName@test.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
})


test('order pizza', async ({ page }) => {
  /*
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('testName@test.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
  */
  await page.getByRole('button', { name: 'Order now' }).click();
  await page.getByRole('combobox').selectOption('1');
  await page.getByRole('link', { name: 'Image Description Pepperoni' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('button', { name: 'Pay now' }).click();
  await page.getByRole('button', { name: 'Verify' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  //await page.getByRole('button', { name: 'Close' }).click();
})
