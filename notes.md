# Learning notes

## JWT Pizza code study and debugging

As part of `Deliverable ⓵ Development deployment: JWT Pizza`, start up the application and debug through the code until you understand how it works. During the learning process fill out the following required pieces of information in order to demonstrate that you have successfully completed the deliverable.

| User activity                                       | Frontend component     | Backend endpoints                                                                                                                               | Database SQL |
| --------------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| View home page                                      | home                   | `/api/docs`                                                                                                                                     |              |
| Register new user<br/>(t@jwt.com, pw: test)         | register               | '/api/auth', 'POST', { name, email, password }                                                                                                  |              |
| Login new user<br/>(t@jwt.com, pw: test)            | login                  | '/api/auth', 'PUT', { email, password }                                                                                                         | `INSERT INTO auth (token, userId) VALUES (?, ?)`             |
| Order pizza                                         | payment                | '/api/order', 'POST', order                                                                                                                     |              |
| Verify pizza                                        | delivery               | pizzaFactoryUrl + '/api/order/verify', 'POST', { jwt }                                                                                          |              |
| View profile page                                   | dinerDashboard         | '/api/order'                                                                                                                                    |              |
| View franchise<br/>(as diner)                       | franchiseDashboard     | `/api/franchise/${user.id}`                                                                                                                     | `SELECT u.id, u.name, u.email FROM userRole AS ur JOIN user AS u ON u.id=ur.userId WHERE ur.objectId=? AND ur.role='franchisee'`             |
| Logout                                              | logout                 | '/api/auth', 'DELETE'                                                                                                                           | `DELETE FROM auth WHERE token=?`             |
| View About page                                     | about                  | `/api/docs`                                                                                                                                     |              |
| View History page                                   | history                | `/api/docs`                                                                                                                                     |              |
| Login as franchisee<br/>(f@jwt.com, pw: franchisee) | login                  | '/api/auth', 'PUT', { email, password }                                                                                                         | `INSERT INTO auth (token, userId) VALUES (?, ?)`             |
| View franchise<br/>(as franchisee)                  | franchiseDashboard     | `/api/franchise/${user.id}`                                                                                                                     | `SELECT u.id, u.name, u.email FROM userRole AS ur JOIN user AS u ON u.id=ur.userId WHERE ur.objectId=? AND ur.role='franchisee'`             |
| Create a store                                      | createStore            | `/api/franchise/${franchise.id}/store`, 'POST', store                                                                                           | `INSERT INTO store (franchiseId, name) VALUES (?, ?)`             |
| Close a store                                       | closeStore             | `/api/franchise/${franchise.id}/store/${store.id}`, 'DELETE'                                                                                    | `DELETE FROM store WHERE franchiseId=? AND id=?`             |
| Login as admin<br/>(a@jwt.com, pw: admin)           | login                  | '/api/auth', 'PUT', { email, password }                                                                                                         | `INSERT INTO auth (token, userId) VALUES (?, ?)`              |
| View Admin page                                     | adminDashboard         | '/api/franchise', 'POST', franchise, `/api/franchise/${franchise.id}`, 'DELETE', `/api/franchise/${franchise.id}/store/${store.id}`, 'DELETE'   | `SELECT objectId FROM userRole WHERE role='franchisee' AND userId=?`, `SELECT id, name FROM franchise WHERE id in (${franchiseIds.join(',')})`             |
| Create a franchise for t@jwt.com                    | createFranchise        | '/api/franchise', 'POST', franchise                                                                                                             | `SELECT id, name FROM user WHERE email=?`, `INSERT INTO franchise (name) VALUES (?)`, `INSERT INTO userRole (userId, role, objectId) VALUES (?, ?, ?)`             |
| Close the franchise for t@jwt.com                   | closeFranchise         | `/api/franchise/${franchise.id}`, 'DELETE'                                                                                                      | `DELETE FROM store WHERE franchiseId=?`, `DELETE FROM userRole WHERE objectId=?`, `DELETE FROM franchise WHERE id=?`              |