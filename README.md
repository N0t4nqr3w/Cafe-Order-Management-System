# Cafe-Order-Management-System
By: Elijah Parkos, Carson Logelin, Benjamin Li, Andrew Yang

## Description
This API is designed for a cafe order management system that handles customer interactions, menu management, and order processing. It allows users:
- Register and manage customers.
- View and manage menu items.
- Create and track orders.
- 

## List of Collections/Models
### Menu Items
- 
### Orders
- 
### Customers
- name (string required, unique)
- email (string required, unique)
- phone number (String required, unique)
- orders (ObjectId => Orders)
- createdAt (Date)

## Roles & Contribution

| Team Member    | Role                   | Contribution                                |
|----------------|------------------------|---------------------------------------------|
| Elijah Parkos  | Frontend Dev. & Models | UI and API integration with schema creation |
| Carson Logelin | Backend Developer      | Built API and menu items logic              |
| Benjamin Li    | Backend Developer      | Built API and orders logic                  |
| Andrew Yang    | Backend Developer      | Built API and customers logic               |

## Endpoints

### Elijah Parkos 
#### main.js:
- 
### Carson Logelin
#### menuItems.js:
- 
### Benjamin Li
#### orders.js:
- 
### Andrew Yang
#### customers.js:
- GET /api/customers
- GET /api/customer/:id
- POST /api/customers
- PUT /api/customers/:id
- DELETE /api/customers/:id
  
