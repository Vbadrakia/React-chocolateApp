# Backend Setup Instructions

## Prerequisites
- Node.js v14+
- PostgreSQL v12+
- npm or yarn

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

   This will install:
   - express - Web framework
   - sequelize - ORM for database
   - pg - PostgreSQL driver
   - bcryptjs - Password hashing
   - jsonwebtoken - JWT authentication
   - dotenv - Environment configuration
   - cors - Cross-origin resource sharing

2. **Configure Environment**
   
   Create or update `.env` file:
   ```
   DATABASE_URL=postgresql://postgres:password@localhost:5432/chocolate_db
   JWT_SECRET=your_secure_jwt_secret_key_here
   PORT=5000
   NODE_ENV=development
   ```

3. **Create Database**
   
   Connect to PostgreSQL and create database:
   ```bash
   createdb chocolate_db
   ```

4. **Start Server**
   
   Development mode (with auto-reload):
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

   Server will start on `http://localhost:5000`

## Project Structure

```
chocolate-backend/
├── config/
│   ├── database.js      # Database configuration
│   └── jwt.js           # JWT utilities & middleware
├── models/
│   ├── User.js          # User model
│   ├── Product.js       # Product model
│   ├── Order.js         # Order model
│   └── OrderItem.js     # OrderItem model
├── routes/
│   ├── auth.js          # Authentication endpoints
│   ├── products.js      # Product endpoints
│   └── orders.js        # Order endpoints
├── server.js            # Server entry point
├── package.json         # Dependencies
└── .env                 # Environment variables
```

## Database Schema

### Relationships
- User (1) → (Many) Orders
- Order (1) → (Many) OrderItems
- Product (1) → (Many) OrderItems

### Models

**User Model**
- Unique email with validation
- Hashed password storage
- Role-based access (user/admin)

**Product Model**
- Name, description, price
- Optional image URL and ingredients

**Order Model**
- Links to User
- Shipping details
- Order status tracking
- Total price calculation

**OrderItem Model**
- Links Order to Product
- Quantity and price tracking

## API Response Format

### Success Response
```json
{
  "data": {...},
  "message": "Success message"
}
```

### Error Response
```json
{
  "error": "Error message"
}
```

## Testing Endpoints

### 1. Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### 3. Get Products
```bash
curl http://localhost:5000/api/products
```

### 4. Create Order (requires token)
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "customerName": "John Doe",
    "shippingAddress": "123 Main St",
    "phone": "1234567890",
    "items": [
      {"productId": "product-uuid", "quantity": 2}
    ]
  }'
```

## Middleware

- **authMiddleware**: Validates JWT token and extracts user data
- **CORS**: Allows frontend to communicate with backend
- **JSON Parser**: Handles JSON request bodies

## Error Handling

- Database connection errors logged to console
- API endpoints return meaningful error messages
- Validation errors caught and returned

## Development Notes

- Database syncs automatically on server start
- Uses UUID for all primary keys
- Timestamps automatically managed
- Password hashing with salt rounds: 10

## Debugging

Enable detailed logging:
```javascript
// In database.js, change logging option
logging: console.log, // Shows all SQL queries
```

## Common Issues

**Port Already in Use**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

**Database Connection Failed**
- Check PostgreSQL is running
- Verify DATABASE_URL format
- Ensure database exists

**JWT Token Invalid**
- Check token is properly formatted
- Verify JWT_SECRET matches
- Check token hasn't expired
