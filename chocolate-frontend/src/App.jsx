import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/Navbar';
import { Toast } from './components/Toast';
import { PrivateRoute, AdminRoute } from './components/ProtectedRoute';
import { LoginScreen } from './screens/LoginScreen';
import { SignupScreen } from './screens/SignupScreen';
import ProductListScreen from './screens/ProductListScreen';
import { ProductDetailsScreen } from './screens/ProductDetailsScreen';
import { CartScreen } from './screens/CartScreen';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { WishlistScreen } from './screens/WishlistScreen';
import { OrderConfirmationScreen } from './screens/OrderConfirmationScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { AdminScreen } from './screens/AdminScreen';
import { AddProductScreen } from './screens/AddProductScreen';
import { EditProductScreen } from './screens/EditProductScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { LuxeChocolateShop } from './screens/LuxeChocolateShop';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ToastProvider>
              <Routes>
              <Route path="/" element={<LuxeChocolateShop />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/products" element={<ProductListScreen />} />
              <Route path="/products/:id" element={<ProductDetailsScreen />} />

              <Route
                path="/cart"
                element={<CartScreen />}
              />

              <Route
                path="/wishlist"
                element={<WishlistScreen />}
              />

              <Route
                path="/checkout"
                element={
                  <PrivateRoute>
                    <CheckoutScreen />
                  </PrivateRoute>
                }
              />

              <Route
                path="/order-confirmation/:orderId"
                element={
                  <PrivateRoute>
                    <OrderConfirmationScreen />
                  </PrivateRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfileScreen />
                  </PrivateRoute>
                }
              />

              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminScreen />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/add-product"
                element={
                  <AdminRoute>
                    <AddProductScreen />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/edit-product/:id"
                element={
                  <AdminRoute>
                    <EditProductScreen />
                  </AdminRoute>
                }
              />
            </Routes>
            </ToastProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
