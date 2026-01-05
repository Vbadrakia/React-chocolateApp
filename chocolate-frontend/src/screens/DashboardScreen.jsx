import React, { useState, useEffect, useContext } from 'react';
import { orderService, productService } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export const DashboardScreen = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    pendingOrders: 0,
    recentOrders: [],
    topProducts: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/products');
      return;
    }
    fetchDashboardStats();
  }, [user, navigate]);

  const fetchDashboardStats = async () => {
    try {
      setIsLoading(true);
      const ordersRes = await orderService.getAll();
      const productsRes = await productService.getAll();

      const orders = ordersRes.data || [];
      const products = productsRes.data || [];

      const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.totalPrice || 0), 0);
      const pendingOrders = orders.filter((o) => o.status === 'Pending').length;

      // Calculate top products by quantity sold
      const productSales = {};
      orders.forEach((order) => {
        order.items?.forEach((item) => {
          const productId = item.productId?._id || item.productId?.id;
          if (productId) {
            productSales[productId] = (productSales[productId] || 0) + item.quantity;
          }
        });
      });

      const topProducts = Object.entries(productSales)
        .map(([id, quantity]) => {
          const product = products.find((p) => (p._id || p.id) === id);
          return {
            name: product?.name || 'Unknown',
            quantity,
            revenue: (parseFloat(product?.price || 0) * quantity).toFixed(2),
          };
        })
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5);

      setStats({
        totalOrders: orders.length,
        totalRevenue: totalRevenue.toFixed(2),
        totalProducts: products.length,
        pendingOrders,
        recentOrders: orders.slice(-5).reverse(),
        topProducts,
      });
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="container"><p>Loading dashboard...</p></div>;
  }

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '65px', minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', color: '#1d1d1f', marginBottom: '30px', fontWeight: '600' }}>Analytics Dashboard</h1>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '32px' }}>📦</div>
              <div>
                <p style={{ fontSize: '12px', color: '#666', margin: '0 0 4px 0' }}>Total Orders</p>
                <p style={{ fontSize: '24px', color: '#1d1d1f', fontWeight: '600', margin: '0' }}>{stats.totalOrders}</p>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '32px' }}>💰</div>
              <div>
                <p style={{ fontSize: '12px', color: '#666', margin: '0 0 4px 0' }}>Total Revenue</p>
                <p style={{ fontSize: '24px', color: '#1d1d1f', fontWeight: '600', margin: '0' }}>₹{stats.totalRevenue}</p>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '32px' }}>🛍️</div>
              <div>
                <p style={{ fontSize: '12px', color: '#666', margin: '0 0 4px 0' }}>Total Products</p>
                <p style={{ fontSize: '24px', color: '#1d1d1f', fontWeight: '600', margin: '0' }}>{stats.totalProducts}</p>
              </div>
            </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <p className="stat-label">Pending Orders</p>
            <p className="stat-value">{stats.pendingOrders}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Top Selling Products</h2>
            <button onClick={() => navigate('/admin')} className="btn-link">
              View All Products →
            </button>
          </div>
          {stats.topProducts.length === 0 ? (
            <p className="no-data">No sales data yet</p>
          ) : (
            <div className="products-table">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Units Sold</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topProducts.map((product, idx) => (
                    <tr key={idx}>
                      <td>{product.name}</td>
                      <td>{product.quantity}</td>
                      <td>₹{product.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Orders</h2>
            <button onClick={() => navigate('/admin')} className="btn-link">
              View All Orders →
            </button>
          </div>
          {stats.recentOrders.length === 0 ? (
            <p className="no-data">No orders yet</p>
          ) : (
            <div className="recent-orders">
              {stats.recentOrders.map((order) => {
                const orderId = order._id || order.id;
                return (
                  <div key={orderId} className="recent-order-item">
                    <div className="order-details">
                      <p className="order-id">Order #{orderId.substring(0, 8)}</p>
                      <p className="order-customer">{order.customerName}</p>
                    </div>
                    <div className="order-amount">₹{parseFloat(order.totalPrice || 0).toFixed(2)}</div>
                    <div className={`order-status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
        </div>
      </div>
    </>
  );
};
