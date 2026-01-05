import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authService = {
  signup: (email, password) => api.post('/auth/signup', { email, password }),
  login: (email, password) => api.post('/auth/login', { email, password }),
};

// Product endpoints
export const productService = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

// Order endpoints
export const orderService = {
  create: (data) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders/user/my-orders'),
  getAll: () => api.get('/orders'),
  updateStatus: (id, status) => api.put(`/orders/${id}`, { status }),
};

// Mock products data
export const products = [
  {
    id: 1,
    name: 'Dark Chocolate Supreme',
    category: 'Dark Chocolate',
    description: 'Rich 70% cocoa dark chocolate with smooth finish',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop',
    rating: 4.8
  },
  {
    id: 2,
    name: 'Milk Chocolate Bliss',
    category: 'Milk Chocolate',
    description: 'Creamy milk chocolate with hazelnut swirls',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1599599810914-4dc2f0f42c9d?w=500&h=500&fit=crop',
    rating: 4.7
  },
  {
    id: 3,
    name: 'White Chocolate Dream',
    category: 'White Chocolate',
    description: 'Silky white chocolate with vanilla essence',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1585707734263-5d5fba3b3d1f?w=500&h=500&fit=crop',
    rating: 4.6
  },
  {
    id: 4,
    name: 'Truffle Assortment',
    category: 'Truffles',
    description: 'Hand-rolled truffles with various flavors',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1587652211207-2f9f9c5f0d34?w=500&h=500&fit=crop',
    rating: 4.9
  },
  {
    id: 5,
    name: 'Premium Gift Box',
    category: 'Gift Boxes',
    description: 'Luxury assorted chocolates in elegant packaging',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1549598425-c1c7f0e2f1b5?w=500&h=500&fit=crop',
    rating: 5.0
  },
  {
    id: 6,
    name: 'Caramel Cluster',
    category: 'Dark Chocolate',
    description: 'Dark chocolate with crunchy caramel and sea salt',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1596599810694-b5ac4dd33e2b?w=500&h=500&fit=crop',
    rating: 4.7
  }
];

export default api;
