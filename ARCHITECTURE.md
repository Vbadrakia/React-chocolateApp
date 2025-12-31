# Project Overview & Architecture

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER BROWSER                              │
│                  (localhost:3000)                            │
└────────────────────────────┬────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   REACT FRONTEND │
                    │  (Vite + Router)  │
                    └────────┬─────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
    ┌─────▼─────┐    ┌──────▼──────┐   ┌──────▼───────┐
    │ Auth Page │    │ Cart Context│   │Admin Dashboard│
    │           │    │             │   │               │
    │ Login/    │◄──►│ Add/Remove  │◄─►│ Orders List   │
    │ Signup    │    │ Update Qty  │   │ Update Status │
    └───────────┘    └─────────────┘   └───────────────┘
          │
          │ JWT Token
          │
    ┌─────▼─────────────────────────────┐
    │    AXIOS API CLIENT               │
    │  (localhost:5000/api)              │
    └─────┬──────────────────────────────┘
          │
    ┌─────▼─────────────────────────────┐
    │   EXPRESS.JS BACKEND              │
    │  (Node.js Server)                  │
    └─────┬──────────────────────────────┘
          │
    ┌─────┴──────────┬──────────────┬──────────────┐
    │                │              │              │
┌───▼────┐   ┌──────▼────┐  ┌─────▼──┐   ┌──────▼─────┐
│ Auth   │   │ Products  │  │ Orders │   │ Validation │
│Routes  │   │ Routes    │  │Routes  │   │ Middleware │
└────────┘   └───────────┘  └────────┘   └────────────┘
    │              │             │
    └──────────────┼─────────────┘
                   │
          ┌────────▼────────┐
          │  Sequelize ORM  │
          │  (Connection    │
          │   Pool)         │
          └────────┬────────┘
                   │
        ┌──────────▼──────────┐
        │  PostgreSQL         │
        │  Database           │
        │                     │
        │ ┌─────────────────┐ │
        │ │ Users Table     │ │
        │ │ Products Table  │ │
        │ │ Orders Table    │ │
        │ │ OrderItems Table│ │
        │ └─────────────────┘ │
        └─────────────────────┘
```

---

## 📊 Data Flow

### User Registration Flow
```
User fills signup form
        ↓
Submit to /api/auth/signup
        ↓
Backend validates email
        ↓
Hash password with bcrypt
        ↓
Create user in database
        ↓
Generate JWT token
        ↓
Return token + user data
        ↓
Frontend stores token in localStorage
        ↓
Update AuthContext with user
        ↓
Redirect to /products
```

### Shopping & Checkout Flow
```
Browse Products
        ↓
Click "Add to Cart"
        ↓
Add to CartContext
        ↓
Persist to localStorage
        ↓
Navigate to /cart
        ↓
Review items & quantities
        ↓
Click "Checkout"
        ↓
Fill shipping form
        ↓
POST /api/orders with items
        ↓
Backend creates Order record
        ↓
Backend creates OrderItem records
        ↓
Clear cart
        ↓
Show confirmation page
        ↓
View in /profile
```

### Admin Order Management Flow
```
Admin logs in (admin@example.com)
        ↓
Role = 'admin' ✓
        ↓
Access /admin
        ↓
GET /api/orders (all orders)
        ↓
Display orders table
        ↓
Select new status
        ↓
PUT /api/orders/:id
        ↓
Update order status
        ↓
Refresh display
```

---

## 🔄 Component Communication

### Frontend State Management

```
App.jsx
├── AuthProvider (Context)
│   ├── Navbar.jsx
│   │   └── Uses user & logout
│   └── Routes
│       ├── ProtectedRoute wrapper
│       └── All screens use AuthContext
│
└── CartProvider (Context)
    ├── Navbar.jsx
    │   └── Shows cart count
    ├── ProductListScreen
    │   └── Adds to cart
    ├── CartScreen
    │   └── Update/remove items
    └── CheckoutScreen
        └── Creates order, clears cart
```

### Backend Request/Response

```
Client Request
    ↓
Express Middleware
├─ CORS
├─ JSON Parser
└─ authMiddleware (if protected)
    ↓
Route Handler
├─ Validation
├─ Database Query
└─ Error Handling
    ↓
JSON Response
├─ Success (200/201)
└─ Error (400/401/403/500)
```

---

## 🔐 Authentication Flow

```
┌─────────────────────────────────────────────┐
│ Frontend                                    │
│ ┌────────────────────────────────────────┐ │
│ │ AuthContext                            │ │
│ │ - user (null/object)                   │ │
│ │ - token (null/JWT)                     │ │
│ │ - login(user, token)                   │ │
│ │ - logout()                             │ │
│ └────────────────────────────────────────┘ │
│ ↓                                          │
│ localStorage                               │
│ - token                                    │
│ - user                                     │
└─────────────────────────────────────────────┘
          ↓ (API Request)
┌─────────────────────────────────────────────┐
│ Backend                                     │
│ ┌────────────────────────────────────────┐ │
│ │ POST /auth/login                       │ │
│ │ - Email + Password                     │ │
│ │ - Find user in DB                      │ │
│ │ - Verify password (bcrypt)             │ │
│ │ - Generate JWT token                   │ │
│ │ - Return token + user                  │ │
│ └────────────────────────────────────────┘ │
│ ↓                                          │
│ Protected Routes (authMiddleware)          │
│ - Extract token from header                │
│ - Verify JWT                               │
│ - Attach user to request                   │
│ - Allow/deny access                        │
└─────────────────────────────────────────────┘
```

---

## 📈 Database Relationships

```
User (1) ──────→ (Many) Order
  │
  ├─ id (UUID)
  ├─ email
  ├─ password
  ├─ role (user/admin)
  └─ createdAt

                    Order (1) ──────→ (Many) OrderItem
                      │
                      ├─ id (UUID)
                      ├─ userId (FK)
                      ├─ customerName
                      ├─ shippingAddress
                      ├─ phone
                      ├─ totalPrice
                      ├─ status
                      └─ createdAt

                                        OrderItem
                                          │
                                          ├─ id (UUID)
                                          ├─ orderId (FK)
                                          ├─ productId (FK)
                                          ├─ quantity
                                          └─ price

                                            ↓
                                    Product (1)
                                      │
                                      ├─ id (UUID)
                                      ├─ name
                                      ├─ description
                                      ├─ price
                                      ├─ imageUrl
                                      ├─ ingredients
                                      └─ createdAt
```

---

## 🎯 File Responsibilities

### Backend Files

**server.js**
- Express app setup
- Middleware configuration
- Route mounting
- Server startup

**config/database.js**
- Sequelize instance
- Database connection
- Connection pooling

**config/jwt.js**
- Token generation
- Token verification
- Auth middleware

**models/*.js**
- Database schema definitions
- Data validation rules
- Relationships

**routes/*.js**
- API endpoint handlers
- Request validation
- Response formatting

### Frontend Files

**App.jsx**
- Route definitions
- Provider setup
- Layout structure

**context/*.jsx**
- State management
- Data persistence
- Context providers

**services/api.js**
- Axios configuration
- API endpoints
- Token interceptor

**screens/*.jsx**
- Page components
- User interactions
- Form handling

**components/*.jsx**
- Reusable components
- Navigation
- Protection logic

---

## 🔗 API Endpoint Groups

### Auth Endpoints
```
POST /api/auth/signup      → Register user
POST /api/auth/login       → Login user
```

### Product Endpoints
```
GET  /api/products         → List all products
GET  /api/products/:id     → Get product details
POST /api/products         → Add product (admin)
PUT  /api/products/:id     → Update product (admin)
DEL  /api/products/:id     → Delete product (admin)
```

### Order Endpoints
```
POST /api/orders           → Create order
GET  /api/orders/user/my-orders → User orders
GET  /api/orders           → All orders (admin)
PUT  /api/orders/:id       → Update status (admin)
```

---

## 🎨 UI/UX Flow

### User Journey

```
Start
  ↓
Not Authenticated?
  └─→ Login Page
      ├─→ Sign Up?
      │   └─→ Signup Page → Verify & Login
      └─→ Enter credentials
          ↓
      Authenticated!
          ↓
     Products Page (Browse)
      ├─→ Add to Cart → Cart Updated
      ├─→ View Product Details
      └─→ Cart Icon (quantity badge)
          ↓
     Cart Page (Review)
      ├─→ Update quantities
      ├─→ Remove items
      └─→ Proceed to Checkout
          ↓
     Checkout Page (Shipping)
      ├─→ Enter name
      ├─→ Enter address
      └─→ Enter phone
          ↓
     Order Confirmation
      ├─→ Show order details
      └─→ Options:
          ├─→ Continue Shopping
          └─→ View Orders
          ↓
     Profile Page (History)
      ├─→ View past orders
      ├─→ Check status
      └─→ Repeat shopping
```

### Admin Journey

```
Admin Login (admin@example.com)
      ↓
Admin Panel Access (Navbar)
      ↓
View Orders Dashboard
├─→ Table with all customer orders
├─→ See details:
│   ├─ Customer name
│   ├─ Items purchased
│   ├─ Total amount
│   └─ Current status
└─→ Actions:
    ├─→ Update order status
    ├─→ Or Add New Product
    │   ├─ Product name
    │   ├─ Description
    │   ├─ Price
    │   ├─ Image URL
    │   └─ Ingredients
    └─→ Back to dashboard
```

---

## 🚨 Error Handling

### Backend Error Responses

```javascript
// 400 - Bad Request
{ "error": "Field required" }

// 401 - Unauthorized
{ "error": "Invalid credentials" }
{ "error": "No token provided" }

// 403 - Forbidden
{ "error": "Admin access required" }

// 404 - Not Found
{ "error": "Product not found" }

// 500 - Server Error
{ "error": "Database connection failed" }
```

### Frontend Error Handling

```javascript
// Caught by API interceptor
// Displayed as alert or toast

// Network error → "Failed to load..."
// Validation error → Field highlight
// Auth error → Redirect to login
// Server error → "Something went wrong"
```

---

## 🔄 State Persistence

### LocalStorage Usage

```javascript
// Auth Context
localStorage.setItem('token', authToken)
localStorage.setItem('user', JSON.stringify(userData))

// Cart Context
localStorage.setItem('cart', JSON.stringify(cartItems))
```

### Persistence On Page Load

1. **App Start**
   - Read localStorage
   - Check token expiration
   - Restore user + cart state
   - Show loading indicator
   - Then render UI

---

## 📱 Responsive Breakpoints

```
Mobile:  < 600px
Tablet:  600px - 768px
Desktop: > 768px

Layout changes:
- Single column → Grid layouts
- Sticky navbar → Fixed/scroll
- Form width: 100% → max-width
- Font sizes: smaller → larger
```

---

## ✨ Key Features Summary

| Feature | Frontend | Backend | Database |
|---------|----------|---------|----------|
| Authentication | React forms | JWT + bcrypt | Users table |
| Products | Grid display | REST API | Products table |
| Cart | Context API | localStorage | N/A |
| Orders | Forms + display | CRUD API | Orders + OrderItems |
| Admin | Protected routes | Role check | User role field |

---

## 🎓 Technology Justification

**Why React?** - Fast, component reusability, large ecosystem
**Why Express?** - Lightweight, fast, perfect for REST APIs
**Why PostgreSQL?** - Relational data, ACID compliance, scalable
**Why JWT?** - Stateless auth, secure, industry standard
**Why Context API?** - No extra dependencies, built into React
**Why Sequelize?** - ORM with relationships, validation, migrations

---

## 🚀 Performance Considerations

**Frontend Optimizations:**
- Vite for fast builds
- Code splitting with React Router
- localStorage for offline support
- CSS minification

**Backend Optimizations:**
- Database connection pooling
- Indexed queries
- Proper pagination ready

**Database Optimizations:**
- Proper indexing on IDs
- Foreign key relationships
- Efficient queries via ORM

---

**Ready to Deploy?** See ENVIRONMENT_SETUP.md and individual SETUP.md files.

Version: 1.0.0  
Created: December 2025
