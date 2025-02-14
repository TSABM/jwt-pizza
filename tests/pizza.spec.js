import { test, expect } from 'playwright-test-coverage';
//main page
test('home page', async ({ page }) => {
  await page.goto('/');

  expect(await page.title()).toBe('JWT Pizza');
});
//login and purchase
test('purchase with login', async ({ page }) => {
    await page.route('*/**/api/order/menu', async (route) => {
      const menuRes = [
        { id: 1, title: 'Veggie', image: 'pizza1.png', price: 0.0038, description: 'A garden of delight' },
        { id: 2, title: 'Pepperoni', image: 'pizza2.png', price: 0.0042, description: 'Spicy treat' },
      ];
      expect(route.request().method()).toBe('GET');
      await route.fulfill({ json: menuRes });
    });
  
    await page.route('*/**/api/franchise', async (route) => {
      const franchiseRes = [
        {
          id: 2,
          name: 'LotaPizza',
          stores: [
            { id: 4, name: 'Lehi' },
            { id: 5, name: 'Springville' },
            { id: 6, name: 'American Fork' },
          ],
        },
        { id: 3, name: 'PizzaCorp', stores: [{ id: 7, name: 'Spanish Fork' }] },
        { id: 4, name: 'topSpot', stores: [] },
      ];
      expect(route.request().method()).toBe('GET');
      await route.fulfill({ json: franchiseRes });
    });
  
    await page.route('*/**/api/auth', async (route) => {
      const loginReq = { email: 'd@jwt.com', password: 'a' };
      const loginRes = { user: { id: 3, name: 'Kai Chen', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'abcdef' };
      expect(route.request().method()).toBe('PUT');
      expect(route.request().postDataJSON()).toMatchObject(loginReq);
      await route.fulfill({ json: loginRes });
    });
  
    await page.route('*/**/api/order', async (route) => {
      const orderReq = {
        items: [
          { menuId: 1, description: 'Veggie', price: 0.0038 },
          { menuId: 2, description: 'Pepperoni', price: 0.0042 },
        ],
        storeId: '4',
        franchiseId: 2,
      };
      const orderRes = {
        order: {
          items: [
            { menuId: 1, description: 'Veggie', price: 0.0038 },
            { menuId: 2, description: 'Pepperoni', price: 0.0042 },
          ],
          storeId: '4',
          franchiseId: 2,
          id: 23,
        },
        jwt: 'eyJpYXQ',
      };
      expect(route.request().method()).toBe('POST');
      expect(route.request().postDataJSON()).toMatchObject(orderReq);
      await route.fulfill({ json: orderRes });
    });
  
    await page.goto('/');
  
    // Go to order page
    await page.getByRole('button', { name: 'Order now' }).click();
  
    // Create order
    await expect(page.locator('h2')).toContainText('Awesome is a click away');
    await page.getByRole('combobox').selectOption('4');
    await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
    await page.getByRole('link', { name: 'Image Description Pepperoni' }).click();
    await expect(page.locator('form')).toContainText('Selected pizzas: 2');
    await page.getByRole('button', { name: 'Checkout' }).click();
  
    // Login
    await page.getByPlaceholder('Email address').click();
    await page.getByPlaceholder('Email address').fill('d@jwt.com');
    await page.getByPlaceholder('Email address').press('Tab');
    await page.getByPlaceholder('Password').fill('a');
    await page.getByRole('button', { name: 'Login' }).click();
  
    // Pay
    await expect(page.getByRole('main')).toContainText('Send me those 2 pizzas right now!');
    await expect(page.locator('tbody')).toContainText('Veggie');
    await expect(page.locator('tbody')).toContainText('Pepperoni');
    await expect(page.locator('tfoot')).toContainText('0.008 ₿');
    await page.getByRole('button', { name: 'Pay now' }).click();
  
    // Check balance
    await expect(page.getByText('0.008')).toBeVisible();
  });


  /*
//franchise stuff
test("test franchises", async({page})=>{
    //create a new franchise
    
    
    //view franchise stuff
    
    //create franchise
    
    //create franchise store
    
    //delete franchise store

})
*/
  

//admin stuff
test("test admin", async ({page})=>{
    //login admin mock
    await page.route('*/**/api/auth', async (route) => {
        const adminloginReq = { email: 'a@jwt.com', password: 'admin' };
        const adminLoginResp = {
            "user": {
              "id": 1,
              "name": "常用名字",
              "email": "a@jwt.com",
              "roles": [
                {
                  "role": "admin"
                }
              ]
            },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IuW4uOeUqOWQjeWtlyIsImVtYWlsIjoiYUBqd3QuY29tIiwicm9sZXMiOlt7InJvbGUiOiJhZG1pbiJ9XSwiaWF0IjoxNzM5NDkwNzI4fQ.IMDOYpQ35SBguKj6Ddbi9_UsGIbRsYxFn2CfVgWtQBg"
          }
        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(adminloginReq);
        await route.fulfill({ json: adminLoginResp });
      });
    //mock for admin add franchise
    await page.route('*/**/api/franchise', async (route) => {
        if (route.request().method() === 'GET') {
        const franchiseRes = [
            {
              "id": 18,
              "name": "0i20r9lm7xTestFranchise",
              "admins": [
                {
                  "id": 90,
                  "name": "0i20r9lm7x",
                  "email": "0i20r9lm7x@admin.com"
                }
              ],
              "stores": []
            },
            {
              "id": 8,
              "name": "2jpg8vig00TestFranchise",
              "admins": [
                {
                  "id": 70,
                  "name": "2jpg8vig00",
                  "email": "2jpg8vig00@admin.com"
                }
              ],
              "stores": []
            },
            {
              "id": 17,
              "name": "3pdp07ilqnTestFranchise",
              "admins": [
                {
                  "id": 88,
                  "name": "3pdp07ilqn",
                  "email": "3pdp07ilqn@admin.com"
                }
              ],
              "stores": []
            },
            {
              "id": 9,
              "name": "3t3f8tr86eTestFranchise",
              "admins": [
                {
                  "id": 72,
                  "name": "3t3f8tr86e",
                  "email": "3t3f8tr86e@admin.com"
                }
              ],
              "stores": []
            },
            {
              "id": 10,
              "name": "6o74dgq16mTestFranchise",
              "admins": [
                {
                  "id": 74,
                  "name": "6o74dgq16m",
                  "email": "6o74dgq16m@admin.com"
                }
              ],
              "stores": []
            },
            {
              "id": 22,
              "name": "andmnbbk90TestFranchise",
              "admins": [
                {
                  "id": 99,
                  "name": "andmnbbk90",
                  "email": "andmnbbk90@admin.com"
                }
              ],
              "stores": []
            },
            {
              "id": 14,
              "name": "eu0fzou09aTestFranchise",
              "admins": [
                {
                  "id": 82,
                  "name": "eu0fzou09a",
                  "email": "eu0fzou09a@admin.com"
                }
              ],
              "stores": []
            },
            {
              "id": 15,
              "name": "h64aie7o6cTestFranchise",
              "admins": [
                {
                  "id": 85,
                  "name": "h64aie7o6c",
                  "email": "h64aie7o6c@admin.com"
                }
              ],
              "stores": []
            },
            {
              "id": 24,
              "name": "i6j6wjl6xwTestFranchise",
              "admins": [
                {
                  "id": 103,
                  "name": "i6j6wjl6xw",
                  "email": "i6j6wjl6xw@admin.com"
                }
              ],
              "stores": [
                {
                  "id": 14,
                  "name": "47kar8ci4n",
                  "totalRevenue": 0.0042
                }
              ]
            },
            {
              "id": 19,
              "name": "i9m8j97cykTestFranchise",
              "admins": [
                {
                  "id": 92,
                  "name": "i9m8j97cyk",
                  "email": "i9m8j97cyk@admin.com"
                }
              ],
              "stores": []
            },
            {
              "id": 12,
              "name": "iee4k7cwzfTestFranchise",
              "admins": [
                {
                  "id": 77,
                  "name": "iee4k7cwzf",
                  "email": "iee4k7cwzf@admin.com"
                }
              ],
              "stores": []
            },
            {
              "id": 11,
              "name": "j4gleki0xgTestFranchise",
              "admins": [
                {
                  "id": 76,
                  "name": "j4gleki0xg",
                  "email": "j4gleki0xg@admin.com"
                }
              ],
              "stores": []
            },
            {
              "id": 21,
              "name": "liyiq5xd1rTestFranchise",
              "admins": [
                {
                  "id": 97,
                  "name": "liyiq5xd1r",
                  "email": "liyiq5xd1r@admin.com"
                }
              ],
              "stores": []
            },
            {
              "id": 13,
              "name": "okke5tjl6mTestFranchise",
              "admins": [
                {
                  "id": 80,
                  "name": "okke5tjl6m",
                  "email": "okke5tjl6m@admin.com"
                }
              ],
              "stores": []
            },
            {
              "id": 1,
              "name": "pizzaPocket",
              "admins": [
                {
                  "id": 3,
                  "name": "pizza franchisee",
                  "email": "f@jwt.com"
                }
              ],
              "stores": [
                {
                  "id": 1,
                  "name": "SLC",
                  "totalRevenue": 0.0836
                }
              ]
            },
            {
              "id": 20,
              "name": "r2oup57s1eTestFranchise",
              "admins": [
                {
                  "id": 95,
                  "name": "r2oup57s1e",
                  "email": "r2oup57s1e@admin.com"
                }
              ],
              "stores": []
            },
            {
              "id": 4,
              "name": "testFranchise",
              "admins": [
                {
                  "id": 61,
                  "name": "x1np4lkpbq",
                  "email": "x1np4lkpbq@admin.com"
                }
              ],
              "stores": []
            },
            {
              "id": 16,
              "name": "v90xakbcfnTestFranchise",
              "admins": [
                {
                  "id": 87,
                  "name": "v90xakbcfn",
                  "email": "v90xakbcfn@admin.com"
                }
              ],
              "stores": []
            }
          ];
        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: franchiseRes });
        }
        else if (route.request().method() === 'POST'){
            const createRes = { "name": "test3", "admins": [{ "email": "a@jwt.com", "id": 1, "name": "常用名字" }], "id": 73 }
            /*
            const createReq = {
                "stores": [],
                "id": 73,
                "name": "test3",
                "admins": [
                  {
                    "email": "a@jwt.com",
                    "id": 1,
                    "name": "常用名字"
                  }
                ]
              }
                */
            const createReq = {
                "stores": [],
                "id": "",
                "name": "test3",
                "admins": [
                  {
                    "email": "a@jwt.com"
                  }
                ]
              }
              expect(route.request().method()).toBe('POST');
              expect(route.request().postDataJSON()).toMatchObject(createReq);
              await route.fulfill({ json: createRes }); 
        }
      });
    //mock for admin delete franchise?
    await page.route('*/**/api/franchise/*', async (route) => {
        const deleteRes = {
            "message": "franchise deleted"
          };
        expect(route.request().method()).toBe('DELETE');
        await route.fulfill({ json: deleteRes });
      });

    //test
    await page.goto('/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('a@jwt.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('admin');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('link', { name: 'Admin' }).click();

    await page.getByRole('button', { name: 'Add Franchise' }).click();
    await page.getByRole('textbox', { name: 'franchise name' }).click();
    await page.getByRole('textbox', { name: 'franchise name' }).fill('test3');
    await page.getByRole('textbox', { name: 'franchisee admin email' }).click();
    await page.getByRole('textbox', { name: 'franchisee admin email' }).fill('a@jwt.com');
    await page.getByRole('button', { name: 'Create' }).click();

    //await page.getByRole('row', { name: 'test3 常用名字 Close' }).getByRole('button').click();
    //await page.getByRole('button', { name: 'Close' }).click();
})
  //view admin stuff
  //delete a franchise?