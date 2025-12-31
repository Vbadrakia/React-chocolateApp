# Frontend Setup Instructions

## Prerequisites
- Node.js v14+
- npm or yarn
- Running backend server on port 5000

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

   Key dependencies:
   - react - UI library
   - react-router-dom - Client-side routing
   - axios - HTTP client
   - vite - Build tool
   - @vitejs/plugin-react - React plugin for Vite

2. **Configure Environment**
   
   Update `.env` file:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start Development Server**
   
   ```bash
   npm run dev
   ```
   
   Frontend will run on `http://localhost:3000`

4. **Build for Production**
   
   ```bash
   npm run build
   ```
   
   Generates optimized `dist` folder for deployment.

## Project Structure

```
chocolate-frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation bar
│   │   ├── Navbar.css
│   │   └── ProtectedRoute.jsx   # Route protection
│   ├── context/
│   │   ├── AuthContext.jsx      # Auth state management
│   │   └── CartContext.jsx      # Cart state management
│   ├── screens/
│   │   ├── LoginScreen.jsx      # Login page
│   │   ├── SignupScreen.jsx     # Signup page
│   │   ├── ProductListScreen.jsx
│   │   ├── CartScreen.jsx
│   │   ├── CheckoutScreen.jsx
│   │   ├── OrderConfirmationScreen.jsx
│   │   ├── ProfileScreen.jsx
│   │   ├── AdminScreen.jsx
│   │   ├── AddProductScreen.jsx
│   │   └── *.css                # Screen styles
│   ├── services/
│   │   └── api.js               # API service with axios
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── index.html                   # HTML template
├── vite.config.js               # Vite config
├── package.json
└── .env                         # Environment variables
```

## Key Features

### Context API State Management

**AuthContext**
- Manages user login state
- Stores JWT token
- Provides login/logout functions
- Persists to localStorage

**CartContext**
- Manages shopping cart items
- Add/remove/update quantity
- Calculate totals
- Persist to localStorage

### Routing

Protected routes require authentication:
- `/cart` - Protected (user only)
- `/checkout` - Protected (user only)
- `/profile` - Protected (user only)
- `/admin` - Protected (admin only)
- `/admin/add-product` - Protected (admin only)

### API Integration

Axios interceptor automatically adds JWT token to requests:
```javascript
Authorization: Bearer <token>
```

### Component Hierarchy

```
App
├── AuthProvider
│   └── CartProvider
│       ├── Navbar
│       └── Routes
│           ├── LoginScreen
│           ├── SignupScreen
│           ├── ProductListScreen
│           ├── CartScreen
│           ├── CheckoutScreen
│           ├── OrderConfirmationScreen
│           ├── ProfileScreen
│           ├── AdminScreen
│           └── AddProductScreen
```

## Usage Flow

### User Registration & Login
1. User signs up with email/password
2. Backend creates account with role 'user'
3. JWT token returned and stored in localStorage
4. User redirected to products page

### Shopping Flow
1. Browse products on ProductListScreen
2. Add items to cart (stored in CartContext & localStorage)
3. Navigate to CartScreen to review items
4. Click checkout to proceed to CheckoutScreen
5. Fill shipping details and create order
6. Order confirmation page with details
7. User can view order history in ProfileScreen

### Admin Flow
1. Admin logs in (hardcoded: admin@example.com)
2. Access admin panel in navbar
3. View all customer orders in AdminScreen
4. Update order status
5. Add new products via AddProductScreen

## Styling

### Color Scheme
- Primary: `#622a0f` - Dark brown
- Secondary: `#8d4925` - Medium brown
- Background: `#f5efea` - Cream
- Accents: Greens for success, reds for danger

### Responsive Design
- Mobile-first approach
- Grid layouts adapt to screen size
- Touch-friendly buttons and inputs

### CSS Files
- `index.css` - Global styles
- `Navbar.css` - Navigation styling
- `Auth.css` - Login/signup styling
- `ProductList.css` - Product grid
- `Cart.css` - Cart layout
- `Checkout.css` - Checkout form
- `OrderConfirmation.css` - Confirmation page
- `Profile.css` - Order history
- `Admin.css` - Admin dashboard

## API Service

Located in `src/services/api.js`:

```javascript
// Authentication
authService.login(email, password)
authService.signup(email, password)

// Products
productService.getAll()
productService.getById(id)
productService.create(data)      // Admin only
productService.update(id, data)  // Admin only
productService.delete(id)        // Admin only

// Orders
orderService.create(data)
orderService.getMyOrders()
orderService.getAll()            // Admin only
orderService.updateStatus(id, status) // Admin only
```

## Debugging

### Redux DevTools
Browser DevTools work with Context API state.

### Network Tab
Check API requests and responses in Network tab.

### Local Storage
Check authentication tokens:
```javascript
localStorage.getItem('token')
localStorage.getItem('user')
localStorage.getItem('cart')
```

## Common Issues

### Blank Page
- Check browser console for errors
- Verify backend is running
- Check VITE_API_URL in .env

### API Errors
- Ensure backend server is running on port 5000
- Check network tab for request/response
- Verify token in Authorization header

### Cart Not Persisting
- Check localStorage is enabled
- Clear browser cache
- Check CartContext implementation

### Admin Routes Not Working
- Verify user role is 'admin'
- Check JWT token includes role
- Verify email is 'admin@example.com' at signup

## Performance Optimization

- Code splitting with React Router
- Lazy loading of components
- Image optimization
- Minified CSS/JS on build

## Production Build

```bash
npm run build
npm run preview  # Preview production build locally
```

## Deployment Checklist

- [ ] Update VITE_API_URL to production backend
- [ ] Remove debug logging
- [ ] Test all routes
- [ ] Test admin functionality
- [ ] Test checkout flow
- [ ] Verify error handling
- [ ] Check responsive design on mobile
- [ ] Test with various browsers
- [ ] Set up security headers
- [ ] Enable HTTPS
