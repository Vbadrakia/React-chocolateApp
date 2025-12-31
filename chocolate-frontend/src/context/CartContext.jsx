import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const normalizedId = product.id || product._id;
    const normalizedProduct = normalizedId ? { ...product, id: normalizedId } : { ...product };

    console.log('CartContext - Adding product:', normalizedProduct);

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === (normalizedProduct.id || normalizedProduct._id));
      if (existingItem) {
        return prev.map((item) =>
          item.id === (normalizedProduct.id || normalizedProduct._id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      const newCart = [...prev, { ...normalizedProduct, quantity: 1 }];
      console.log('CartContext - Updated cart:', newCart);
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
