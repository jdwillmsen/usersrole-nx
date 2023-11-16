### Running end-to-end tests

Run `nx run usersrole-nx-e2e:e2e --watch` to execute e2e tests in watch mode.\
Run `nx run usersrole-nx-e2e:e2e` to execute e2e tests in headless mode.\
The e2e tests are making use of a testing framework called [Cypress](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test).

#### Setup test accounts

In order to run the tests you will have to set up the accounts.json fixture:

```json
{
  "basic": {
    "uid": "uid here",
    "email": "cicd-basic-account@usersrole.com",
    "displayName": "CICD Basic Account",
    "password": "password here",
    "roles": ["user"]
  },
  "read": {
    "uid": "uid here",
    "email": "cicd-read-account@usersrole.com",
    "displayName": "CICD Read Account",
    "password": "password here",
    "roles": ["user", "read"]
  },
  "manager": {
    "uid": "uid here",
    "email": "cicd-manager-account@usersrole.com",
    "displayName": "CICD Manager Account",
    "password": "password here",
    "roles": ["user", "manager"]
  },
  "admin": {
    "uid": "uid here",
    "email": "cicd-admin-account@usersrole.com",
    "displayName": "CICD Admin Account",
    "password": "password here",
    "roles": ["user", "admin"]
  }
}
```
