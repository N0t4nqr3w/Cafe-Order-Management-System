# Cafe-Order-Management-System
By: Elijah Parkos, Carson Logelin, Benjamin Li, Andrew Yang

## Description
This API is designed for a cafe order management system that handles customer interactions, menu management, and order processing. It allows users to:
1. Register and manage customers.
2. View and manage menu items.
3. Create and track orders.
4. Register and manage barista accounts.

## List of Collections/Models
### Menu Items
- name (String, required, unique)
- category (String, enum, required)
- description (String)
- price (Number, required, min = 0)
- ingredients (String array)
- inStock (Boolean)
### Baristas
- name (String, required, unique)
- email (String, required, unique)
- phone (String, required, unique)
- active (Boolean)
- hiredDate (Date)
### Customers
- name (String, required, unique)
- email (String, required, unique)
- phone (String, required, unique)
- createdAt (Date)
### Orders
- baristaId (ObjectId, ref "Baristas", required)
- itemIds (ObjectId array, ref "MenuItems", required)
- totalCost (Number, required, min = 0)
- status (String, enum)
- createdBy (ObjectId, ref "Customer", required)

## Roles

| Team Member    | Role                     |
|----------------|--------------------------|
| Elijah Parkos  | Models & Postman Testing |
| Carson Logelin | Routes & Queries         |
| Benjamin Li    | Routes                   |
| Andrew Yang    | Routes & README.md       |

## Contributions and Endpoints

### Elijah Parkos 
#### main.js, .env, package.json:
- Project setup
#### /models/baristas.js
- Created the baristas schema
- Added virtual properties (daysSinceHire and status)
#### /models/menuItems.js
- Created the menu items schema
- Added virtual properties (priceInDollars)
#### /models/orders.js
- Created the orders schema
#### Postman
- Created all Postman test cases
### Carson Logelin
#### /routes/menuItems.js:
- GET /api/menu
- POST /api/menu
- PUT /api/menu/:id
- DELETE /api/menu/:id
- Added regex and other query searches
#### /routes/baristas.js:
- GET /api/baristas
- POST /api/baristas
- PUT /api/baristas/:id
- DELETE /api/baristas/:id
- Added query searches
#### /routes/customers,js:
- Added query searches
#### /routes/orders.js:
- Added query searches
### Benjamin Li
#### /routes/orders.js:
- GET /api/orders
- GET /api/orders/:id
- POST /api/orders
- PUT /api/orders/:id
- DELETE /api/orders/:id
### Andrew Yang
#### /models/customer.js:
- Created the customer schema
#### routes/customers.js:
- GET /api/customers
- GET /api/customer/:id
- POST /api/customers
- PUT /api/customers/:id
- DELETE /api/customers/:id
#### README.md
- Wrote most of the README file
  
