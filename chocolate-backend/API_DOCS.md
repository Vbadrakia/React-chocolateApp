# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

---

## Authentication Endpoints

### 1. Sign Up
Create a new user account.

**Endpoint:** `POST /auth/signup`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Error (400):**
```json
{
  "error": "Email already registered"
}
```

---

### 2. Login
Authenticate user and get JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Error (401):**
```json
{
  "error": "Invalid credentials"
}
```

---

## Product Endpoints

### 1. Get All Products
Retrieve all products from the catalog.

**Endpoint:** `GET /products`

**Authentication:** Not required

**Response (200):**
```json
[
  {
    "id": "uuid-1",
    "name": "Dark Chocolate Truffle",
    "description": "Rich and creamy dark chocolate truffle",
    "price": "250.00",
    "imageUrl": "https://...",
    "ingredients": "Cocoa, milk, sugar",
    "createdAt": "2025-12-20T10:00:00Z",
    "updatedAt": "2025-12-20T10:00:00Z"
  },
  ...
]
```

---

### 2. Get Product By ID
Retrieve a specific product.

**Endpoint:** `GET /products/:id`

**Authentication:** Not required

**Response (200):**
```json
{
  "id": "uuid",
  "name": "Milk Chocolate Bar",
  "description": "Smooth and delicious milk chocolate",
  "price": "150.00",
  "imageUrl": "https://...",
  "ingredients": "Cocoa, milk, sugar",
  "createdAt": "2025-12-20T10:00:00Z",
  "updatedAt": "2025-12-20T10:00:00Z"
}
```

**Error (404):**
```json
{
  "error": "Product not found"
}
```

---

### 3. Create Product
Add a new product to the catalog (Admin only).

**Endpoint:** `POST /products`

**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "name": "White Chocolate",
  "description": "Creamy white chocolate",
  "price": 200,
  "imageUrl": "https://...",
  "ingredients": "Cocoa butter, milk, sugar"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "name": "White Chocolate",
  "description": "Creamy white chocolate",
  "price": "200.00",
  "imageUrl": "https://...",
  "ingredients": "Cocoa butter, milk, sugar",
  "createdAt": "2025-12-20T10:00:00Z",
  "updatedAt": "2025-12-20T10:00:00Z"
}
```

**Error (403):**
```json
{
  "error": "Admin access required"
}
```

---

### 4. Update Product
Update an existing product (Admin only).

**Endpoint:** `PUT /products/:id`

**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "price": 220,
  "description": "Updated description"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "name": "White Chocolate",
  "price": "220.00",
  "description": "Updated description",
  ...
}
```

---

### 5. Delete Product
Remove a product from catalog (Admin only).

**Endpoint:** `DELETE /products/:id`

**Authentication:** Required (Admin)

**Response (200):**
```json
{
  "message": "Product deleted successfully"
}
```

---

## Order Endpoints

### 1. Create Order
Create a new order.

**Endpoint:** `POST /orders`

**Authentication:** Required

**Request Body:**
```json
{
  "customerName": "John Doe",
  "shippingAddress": "123 Main Street, City, State 12345",
  "phone": "+91-9876543210",
  "items": [
    {
      "productId": "uuid-1",
      "quantity": 2
    },
    {
      "productId": "uuid-2",
      "quantity": 1
    }
  ]
}
```

**Response (201):**
```json
{
  "message": "Order created successfully",
  "order": {
    "id": "order-uuid",
    "userId": "user-uuid",
    "customerName": "John Doe",
    "shippingAddress": "123 Main Street, City, State 12345",
    "phone": "+91-9876543210",
    "totalPrice": "650.00",
    "status": "Pending",
    "createdAt": "2025-12-20T10:00:00Z",
    "updatedAt": "2025-12-20T10:00:00Z"
  }
}
```

---

### 2. Get My Orders
Retrieve orders for the logged-in user.

**Endpoint:** `GET /orders/user/my-orders`

**Authentication:** Required

**Response (200):**
```json
[
  {
    "id": "order-uuid-1",
    "userId": "user-uuid",
    "customerName": "John Doe",
    "shippingAddress": "123 Main Street",
    "phone": "+91-9876543210",
    "totalPrice": "650.00",
    "status": "Delivered",
    "createdAt": "2025-12-20T10:00:00Z",
    "updatedAt": "2025-12-20T10:05:00Z",
    "OrderItems": [
      {
        "id": "uuid",
        "orderId": "order-uuid-1",
        "productId": "product-uuid",
        "quantity": 2,
        "price": "250.00",
        "Product": {
          "id": "product-uuid",
          "name": "Dark Chocolate",
          ...
        }
      }
    ]
  },
  ...
]
```

---

### 3. Get All Orders (Admin Only)
Retrieve all customer orders.

**Endpoint:** `GET /orders`

**Authentication:** Required (Admin)

**Response (200):**
```json
[
  {
    "id": "order-uuid",
    "userId": "user-uuid",
    "customerName": "John Doe",
    "shippingAddress": "123 Main Street",
    "phone": "+91-9876543210",
    "totalPrice": "650.00",
    "status": "Pending",
    "createdAt": "2025-12-20T10:00:00Z",
    "updatedAt": "2025-12-20T10:00:00Z",
    "User": {
      "email": "user@example.com"
    },
    "OrderItems": [...]
  },
  ...
]
```

---

### 4. Update Order Status (Admin Only)
Update the status of an order.

**Endpoint:** `PUT /orders/:id`

**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "status": "Confirmed"
}
```

**Valid Status Values:**
- `Pending`
- `Confirmed`
- `Shipped`
- `Delivered`
- `Cancelled`

**Response (200):**
```json
{
  "id": "order-uuid",
  "customerName": "John Doe",
  "status": "Confirmed",
  "totalPrice": "650.00",
  ...
}
```

---

## Error Responses

### 400 - Bad Request
```json
{
  "error": "All fields and items required"
}
```

### 401 - Unauthorized
```json
{
  "error": "No token provided"
}
```

or

```json
{
  "error": "Invalid token"
}
```

### 403 - Forbidden
```json
{
  "error": "Admin access required"
}
```

### 404 - Not Found
```json
{
  "error": "Product not found"
}
```

### 500 - Internal Server Error
```json
{
  "error": "Internal server error message"
}
```

---

## Health Check

### Check Backend Status
**Endpoint:** `GET /api/health`

**Response (200):**
```json
{
  "status": "Backend is running"
}
```

---

## Example Usage with cURL

### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Get All Products
```bash
curl http://localhost:5000/api/products
```

### Create Order (with token)
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -d '{
    "customerName": "John Doe",
    "shippingAddress": "123 Main St",
    "phone": "1234567890",
    "items": [{"productId": "uuid", "quantity": 2}]
  }'
```

---

## Rate Limiting
Currently no rate limiting implemented. Can be added using express-rate-limit package.

## CORS
CORS is enabled to allow frontend communication from http://localhost:3000.

---

**Last Updated:** December 2025  
**API Version:** 1.0.0
