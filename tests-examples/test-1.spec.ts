import { test, expect } from '@playwright/test';


/*
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


test('order pep pizza', async ({ page }) => {
  //expect order button
  await page.getByRole('button', { name: 'Order now' }).click();
  //expect there to be some options
  await page.getByRole('combobox').selectOption('1');
  await page.getByRole('link', { name: 'Image Description Pepperoni' }).click();
  //expect checkout screen stuff
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('button', { name: 'Pay now' }).click();
  await page.getByRole('button', { name: 'Verify' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  //await page.getByRole('button', { name: 'Close' }).click();
})
/*
test('other', async({page})=>{
  await page.goto('http://localhost:5173/');

  await expect(page.getByRole('heading')).toContainText('The web\'s best pizza');

  await page.getByRole('button', { name: 'Order now' }).click();

  await expect(page.getByRole('combobox')).toBeEmpty();
  await page.getByRole('combobox').selectOption('1');
  await expect(page.getByRole('link', { name: 'Image Description Pepperoni' })).toBeVisible();

  await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await page.goto('http://localhost:5173/payment/login');
  await page.getByRole('link', { name: 'home' }).click();
  await page.getByRole('button', { name: 'Order now' }).click();
  await page.getByRole('combobox').selectOption('1');
  await expect(page.getByRole('combobox')).toHaveValue('1');
  await expect(page.getByRole('link', { name: 'Image Description Veggie A' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Image Description Pepperoni' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Image Description Margarita' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Image Description Crusty A' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Image Description Charred' })).toBeVisible();
  await page.getByRole('link', { name: 'Order' }).click();
  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
  await expect(page.getByRole('main')).toContainText('So you want a piece of the pie?');
  await expect(page.getByRole('alert')).toContainText('If you are already a franchisee, pleaseloginusing your franchise account');
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page.getByRole('main')).toContainText('The secret sauce');
  await page.getByRole('link', { name: 'History' }).click();
  await expect(page.getByRole('heading')).toContainText('Mama Rucci, my my');
})
  */
