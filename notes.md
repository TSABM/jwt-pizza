# Learning notes

## JWT Pizza code study and debugging

As part of `Deliverable ⓵ Development deployment: JWT Pizza`, start up the application and debug through the code until you understand how it works. During the learning process fill out the following required pieces of information in order to demonstrate that you have successfully completed the deliverable.

| User activity                                       | Frontend component | Backend endpoints | Database SQL |
| --------------------------------------------------- | ------------------ | ----------------- | ------------ |
| View home page                                      |                    |                   |              |
| Register new user<br/>(t@jwt.com, pw: test)         |                    | '/api/auth', 'POST', { name, email, password }                  |              |
| Login new user<br/>(t@jwt.com, pw: test)            |                    | '/api/auth', 'PUT', { email, password }                  |              |
| Order pizza                                         |                    | '/api/order', 'POST', order                  |              |
| Verify pizza                                        |                    | pizzaFactoryUrl + '/api/order/verify', 'POST', { jwt }                  |              |
| View profile page                                   |                    |                   |              |
| View franchise<br/>(as diner)                       |                    |                   |              |
| Logout                                              |                    | '/api/auth', 'DELETE'                  |              |
| View About page                                     |                    |                   |              |
| View History page                                   |                    |                   |              |
| Login as franchisee<br/>(f@jwt.com, pw: franchisee) |                    | '/api/auth', 'PUT', { email, password }                  |              |
| View franchise<br/>(as franchisee)                  |                    |                   |              |
| Create a store                                      |                    | `/api/franchise/${franchise.id}/store`, 'POST', store                  |              |
| Close a store                                       |                    | `/api/franchise/${franchise.id}/store/${store.id}`, 'DELETE'                  |              |
| Login as admin<br/>(a@jwt.com, pw: admin)           |                    | '/api/auth', 'PUT', { email, password }                  |              |
| View Admin page                                     |                    |                   |              |
| Create a franchise for t@jwt.com                    |                    | '/api/franchise', 'POST', franchise   |              |
| Close the franchise for t@jwt.com                   |                    | `/api/franchise/${franchise.id}`, 'DELETE' |              |
