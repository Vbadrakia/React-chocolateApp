# Chocolate Paradise - Full Stack E-Commerce Application

A modern full-stack e-commerce application for chocolate products built with React, Node.js, Express, and PostgreSQL.

## Project Structure

```
chocolate-backend/    # Node.js/Express backend API
chocolate-frontend/   # React frontend application
```

## Features

### User Features
- ✅ User authentication (signup/login)
- ✅ Browse chocolate products
- ✅ Add products to shopping cart
- ✅ Persistent cart storage (localStorage)
- ✅ Checkout with shipping details
- ✅ Order confirmation
- ✅ View order history

### Admin Features
- ✅ Admin dashboard
- ✅ Add new products
- ✅ View all customer orders
- ✅ Update order status
- ✅ Product management

## Tech Stack

### Frontend
- **Framework**: React 19.0.0
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT
- **Password Hashing**: bcryptjs
- **CORS**: Enabled for frontend communication

## Installation & Setup

### One-Command Dev Start (both servers)
1. Install all dependencies from the project root:
  ```bash
  npm install
  ```
2. Start backend (port 5000) and frontend (port 3000) together:
  ```bash
  npm run dev
  ```
3. Open http://localhost:3000 in your browser.

> The root scripts use `concurrently` to run `chocolate-backend` and `chocolate-frontend` dev servers side by side. Use `npm run dev:backend` or `npm run dev:frontend` for individual services.

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd chocolate-backend
   npm install
   ```

2. **Configure environment variables**
   - Copy `.env` file (already provided)
   - Update `DATABASE_URL` with your PostgreSQL connection string
   - Update `JWT_SECRET` with a secure key

   ```
   DATABASE_URL=postgresql://postgres:password@localhost:5432/chocolate_db
   JWT_SECRET=your_jwt_secret_key_change_in_production
   PORT=5000
   NODE_ENV=development
   ```

3. **Create PostgreSQL database**
   ```bash
   createdb chocolate_db
   ```

4. **Start the backend server**
   ```bash
   npm run dev    # Development mode with nodemon
   npm start      # Production mode
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd chocolate-frontend
   npm install
   ```

2. **Configure environment variables**
   - Update `.env` file with backend API URL
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start the frontend development server**
   ```bash
   npm run dev
   ```

   Frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication (`/api/auth`)
- `POST /signup` - Create new user account
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- `POST /login` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### Products (`/api/products`)
- `GET /` - Get all products
- `GET /:id` - Get product by ID
- `POST /` - Create product (Admin only)
  ```json
  {
    "name": "Chocolate Truffle",
    "description": "Delicious chocolate truffle",
    "price": 250,
    "imageUrl": "https://...",
    "ingredients": "Cocoa, milk, sugar"
  }
  ```
- `PUT /:id` - Update product (Admin only)
- `DELETE /:id` - Delete product (Admin only)

### Orders (`/api/orders`)
- `POST /` - Create order
  ```json
  {
    "customerName": "John Doe",
    "shippingAddress": "123 Main St",
    "phone": "1234567890",
    "items": [
      {
        "productId": "uuid",
        "quantity": 2
      }
    ]
  }
  ```
- `GET /user/my-orders` - Get user's orders
- `GET /` - Get all orders (Admin only)
- `PUT /:id` - Update order status (Admin only)
  ```json
  {
    "status": "Confirmed"
  }
  ```

## Default Credentials

For testing purposes:

**User Account**
- Email: `user@example.com`
- Password: `password123`
- Role: User

**Admin Account**
- Email: `admin@example.com`
- Password: `password123`
- Role: Admin

## Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `email` (String, Unique)
- `password` (String, hashed)
- `role` (Enum: 'user', 'admin')
- `createdAt` (Date)
- `updatedAt` (Date)

### Products Table
- `id` (UUID, Primary Key)
- `name` (String)
- `description` (Text)
- `price` (Decimal)
- `imageUrl` (String, nullable)
- `ingredients` (Text, nullable)
- `createdAt` (Date)
- `updatedAt` (Date)

### Orders Table
- `id` (UUID, Primary Key)
- `userId` (UUID, Foreign Key)
- `customerName` (String)
- `shippingAddress` (String)
- `phone` (String)
- `totalPrice` (Decimal)
- `status` (Enum: 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled')
- `createdAt` (Date)
- `updatedAt` (Date)

### OrderItems Table
- `id` (UUID, Primary Key)
- `orderId` (UUID, Foreign Key)
- `productId` (UUID, Foreign Key)
- `quantity` (Integer)
- `price` (Decimal)

## Features Implemented

### Authentication
- Email/password signup and login
- JWT token-based authentication
- Automatic role assignment (admin/user)
- Protected routes and API endpoints

### Shopping Cart
- Add/remove products
- Update quantities
- Persistent storage using localStorage
- Real-time total calculation

### Orders
- Create orders with checkout form
- Order confirmation screen
- Order history with details
- Order status tracking

### Admin Panel
- View all customer orders
- Update order status
- Add new products
- Manage product catalog

### State Management
- Context API for authentication state
- Context API for shopping cart
- Token persistence using localStorage
- User information caching

## Styling

- **Color Scheme**: Chocolate-themed
  - Primary: `#622a0f` (Dark Brown)
  - Secondary: `#8d4925` (Medium Brown)
  - Background: `#f5efea` (Cream)

- **Design**: Responsive, mobile-first approach
- **Component-based**: Modular CSS for each screen

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected API endpoints
- Role-based access control
- CORS configuration
- Input validation

## Future Enhancements

- [ ] Payment integration (Razorpay/Stripe)
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search and filtering
- [ ] Inventory management
- [ ] User profile editing
- [ ] Order tracking with real-time updates
- [ ] Image upload functionality
- [ ] Multiple payment methods
- [ ] Coupon/discount system

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env file
- Verify PostgreSQL credentials

### CORS Error
- Check if backend is running on port 5000
- Verify VITE_API_URL in frontend .env

### Authentication Error
- Clear localStorage and login again
- Check JWT_SECRET configuration
- Verify token is included in API requests

## Deployment

### Backend Deployment (Heroku/Railway)
1. Push code to GitHub
2. Connect repository to deployment platform
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Build frontend: `npm run build`
2. Deploy `dist` folder
3. Update API URL for production

## Support & License

For issues or questions, refer to the documentation or contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: December 2025
