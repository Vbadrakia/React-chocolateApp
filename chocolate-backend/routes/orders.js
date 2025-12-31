import express from 'express';
import { Order } from '../models/Order.js';
import { OrderItem } from '../models/OrderItem.js';
import { Product } from '../models/Product.js';
import { User } from '../models/User.js';
import { authMiddleware } from '../config/jwt.js';

const router = express.Router();

// Create order
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { customerName, shippingAddress, phone, items } = req.body;

    if (!customerName || !shippingAddress || !phone || !items || items.length === 0) {
      return res.status(400).json({ error: 'All fields and items required' });
    }

    let totalPrice = 0;
    const order = await Order.create({
      userId: req.user.userId,
      customerName,
      shippingAddress,
      phone,
      totalPrice: 0,
    });

    for (const item of items) {
      console.log('Processing order item:', item);
      const product = await Product.findById(item.productId);
      if (!product) {
        console.error(`Product not found: ${item.productId}`);
        return res.status(404).json({ error: `Product ${item.productId} not found` });
      }

      console.log('Found product:', product.name);
      const itemTotal = parseFloat(product.price) * item.quantity;
      totalPrice += itemTotal;

      await OrderItem.create({
        orderId: order._id,
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });
    }

    order.totalPrice = totalPrice;
    await order.save();

    res.status(201).json({
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's orders
router.get('/user/my-orders', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId })
      .populate({
        path: 'userId',
        select: 'email',
      })
      .sort({ createdAt: -1 });

    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await OrderItem.find({ orderId: order._id }).populate('productId');
        return { ...order.toObject(), items };
      })
    );

    res.json(ordersWithItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all orders (admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const orders = await Order.find()
      .populate('userId', 'email')
      .sort({ createdAt: -1 });

    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await OrderItem.find({ orderId: order._id }).populate('productId');
        return { ...order.toObject(), items };
      })
    );

    res.json(ordersWithItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
