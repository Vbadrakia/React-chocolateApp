# 🍫 Chocolate Paradise

A full-stack e-commerce application for a luxury chocolate shop, built with React and Node.js.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose) |
| Auth | JWT (jsonwebtoken) |
| Icons | Lucide React |

## Project Structure

```
React-ChocolateParadise/
├── server.js              # Express app entry point
├── seed.js                # Database seeder
├── package.json           # Backend dependencies
├── config/
│   ├── database.js        # MongoDB connection
│   └── jwt.js             # JWT helpers
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   └── OrderItem.js
├── routes/
│   ├── auth.js
│   ├── products.js
│   └── orders.js
└── chocolate-frontend/    # React frontend (Vite)
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── components/    # Navbar, Toast, ProtectedRoute, UI components
        ├── context/       # Auth, Cart, Wishlist, Toast contexts
        ├── screens/       # Page components
        ├── services/      # Axios API client
        └── utils/         # Validation, accessibility helpers
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Backend Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**

   Create a `.env` file at the project root:
   ```env
   MONGODB_URI=mongodb://localhost:27017/chocolate_paradise
   JWT_SECRET=your_jwt_secret_here
   PORT=5000
   ```

3. **Seed the database** *(optional)*
   ```bash
   npm run seed
   ```

4. **Start the backend**
   ```bash
   # Development (auto-reload)
   npm run dev

   # Production
   npm start
   ```

   Backend runs on `http://localhost:5000`.

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd chocolate-frontend
   npm install
   ```

2. **Configure environment**

   Create `chocolate-frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start the frontend**
   ```bash
   npm run dev
   ```

   Frontend runs on `http://localhost:3000`.

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |

### Products
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/products` | List all products | — |
| GET | `/api/products/:id` | Get product details | — |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/:id` | Update product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |

### Orders
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/orders` | Place an order | User |
| GET | `/api/orders` | Get own orders | User |
| GET | `/api/orders/all` | Get all orders | Admin |
| PUT | `/api/orders/:id/status` | Update order status | Admin |

### Health
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Server health check |

## Features

- **Luxury Landing Page** — animated hero section, product showcase, testimonials, and contact form
- **Product Catalog** — browse, filter, and view detailed product pages
- **Shopping Cart** — add/remove items, update quantities, persisted to `localStorage`
- **Wishlist** — save products for later
- **User Authentication** — JWT-based signup/login with protected routes
- **Checkout** — shipping address form and order placement
- **Order History** — view past orders in the profile page
- **Admin Dashboard** — manage products and update order statuses

## User Roles

| Role | Capabilities |
|---|---|
| Guest | Browse products and landing page |
| User | Cart, checkout, wishlist, order history, profile |
| Admin | All user capabilities + product management + order management |

To create an admin account, sign up with email `admin@example.com` or update the user role directly in MongoDB.

## Deployment

### Frontend (Vite build)

```bash
cd chocolate-frontend
npm run build
# Outputs to chocolate-frontend/dist/
```

Deploy the `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages, etc.).

Set the environment variable `VITE_API_URL` in your host's dashboard to point to your production backend URL.

### Backend

Deploy `server.js` and the supporting directories to any Node.js host (Railway, Render, Fly.io, etc.).

Set the following environment variables in your host:
```
MONGODB_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<a long random secret>
PORT=5000
```

## Development Scripts

| Command | Location | Description |
|---|---|---|
| `npm run dev` | root | Start backend with nodemon |
| `npm start` | root | Start backend (production) |
| `npm run seed` | root | Seed the database |
| `node test-api.js` | root | Run API smoke tests (requires running backend) |
| `npm run dev` | `chocolate-frontend/` | Start frontend dev server |
| `npm run build` | `chocolate-frontend/` | Build frontend for production |
| `npm run preview` | `chocolate-frontend/` | Preview production build locally |
