import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB } from './config/database.js';
import { User } from './models/User.js';
import { Product } from './models/Product.js';

dotenv.config();

const chocolateProducts = [
  {
    name: 'Dark Chocolate Bar 70%',
    description: 'Premium dark chocolate with 70% cocoa content. Rich, intense flavor with subtle notes of berries and a smooth finish. Perfect for dark chocolate lovers.',
    price: 299,
    imageUrl: 'https://placehold.co/400x400/3d2817/ffffff?text=Dark+Chocolate+70%25&font=roboto',
    ingredients: 'Cocoa mass, sugar, cocoa butter, vanilla extract',
  },
  {
    name: 'Milk Chocolate Classic',
    description: 'Smooth and creamy milk chocolate made with premium cocoa beans. A timeless classic that melts in your mouth with every bite.',
    price: 199,
    imageUrl: 'https://placehold.co/400x400/c49a6c/ffffff?text=Milk+Chocolate+Classic&font=roboto',
    ingredients: 'Milk powder, sugar, cocoa butter, cocoa mass, vanilla',
  },
  {
    name: 'White Chocolate Delight',
    description: 'Luxurious white chocolate with a creamy texture and sweet vanilla flavor. Made from the finest cocoa butter for a rich taste.',
    price: 249,
    imageUrl: 'https://placehold.co/400x400/f5f5dc/333333?text=White+Chocolate+Delight&font=roboto',
    ingredients: 'Cocoa butter, milk powder, sugar, vanilla',
  },
  {
    name: 'Assorted Truffles Box',
    description: 'Handcrafted chocolate truffles in assorted flavors including hazelnut, caramel, and dark chocolate ganache. 12 pieces per box.',
    price: 599,
    imageUrl: 'https://placehold.co/400x400/6b4423/ffffff?text=Assorted+Truffles+Box&font=roboto',
    ingredients: 'Chocolate, cream, butter, various fillings and flavors',
  },
  {
    name: 'Dark Chocolate with Almonds',
    description: 'Rich 65% dark chocolate studded with crunchy roasted almonds. The perfect combination of bitter and nutty flavors.',
    price: 349,
    imageUrl: 'https://placehold.co/400x400/4a2c1e/ffffff?text=Dark+Chocolate+Almonds&font=roboto',
    ingredients: 'Dark chocolate, roasted almonds, cocoa butter, sugar',
  },
  {
    name: 'Hazelnut Chocolate Bar',
    description: 'Creamy milk chocolate filled with smooth hazelnut praline. A beloved classic that delivers pure indulgence.',
    price: 279,
    imageUrl: 'https://placehold.co/400x400/8b6f47/ffffff?text=Hazelnut+Chocolate+Bar&font=roboto',
    ingredients: 'Milk chocolate, hazelnuts, sugar, cocoa butter, milk powder',
  },
  {
    name: 'Salted Caramel Chocolate',
    description: 'Smooth milk chocolate with luscious salted caramel filling. The perfect balance of sweet and salty in every bite.',
    price: 329,
    imageUrl: 'https://placehold.co/400x400/d4a574/ffffff?text=Salted+Caramel+Chocolate&font=roboto',
    ingredients: 'Milk chocolate, caramel, sea salt, cream, butter',
  },
  {
    name: 'Ruby Chocolate Bar',
    description: 'Exotic ruby chocolate with a unique berry-fruity taste and smooth texture. A naturally pink chocolate experience.',
    price: 449,
    imageUrl: 'https://placehold.co/400x400/e5739d/ffffff?text=Ruby+Chocolate+Bar&font=roboto',
    ingredients: 'Ruby cocoa beans, sugar, cocoa butter, milk powder',
  },
  {
    name: 'Mint Dark Chocolate',
    description: 'Refreshing dark chocolate infused with natural peppermint oil. A cool and invigorating chocolate experience.',
    price: 299,
    imageUrl: 'https://placehold.co/400x400/2d5016/ffffff?text=Mint+Dark+Chocolate&font=roboto',
    ingredients: 'Dark chocolate, peppermint oil, sugar, cocoa butter',
  },
  {
    name: 'Orange Dark Chocolate',
    description: 'Intense dark chocolate with zesty orange essence. A sophisticated blend of citrus and cocoa flavors.',
    price: 319,
    imageUrl: 'https://placehold.co/400x400/d2691e/ffffff?text=Orange+Dark+Chocolate&font=roboto',
    ingredients: 'Dark chocolate, orange extract, cocoa mass, sugar',
  },
  {
    name: 'Coconut Chocolate Bar',
    description: 'Creamy milk chocolate with shredded coconut pieces. Tropical flavors meet rich chocolate in this delightful bar.',
    price: 269,
    imageUrl: 'https://placehold.co/400x400/deb887/333333?text=Coconut+Chocolate+Bar&font=roboto',
    ingredients: 'Milk chocolate, coconut flakes, sugar, cocoa butter',
  },
  {
    name: 'Premium Praline Collection',
    description: 'Assorted Belgian pralines with various fillings including coffee, vanilla, and raspberry. 16 pieces in an elegant box.',
    price: 799,
    imageUrl: 'https://placehold.co/400x400/8b4513/ffffff?text=Premium+Praline+Collection&font=roboto',
    ingredients: 'Belgian chocolate, cream, various premium fillings',
  },
  {
    name: 'Espresso Dark Chocolate',
    description: 'Bold dark chocolate infused with rich espresso coffee. Perfect for coffee and chocolate enthusiasts.',
    price: 349,
    imageUrl: 'https://placehold.co/400x400/4b3621/ffffff?text=Espresso+Dark+Chocolate&font=roboto',
    ingredients: 'Dark chocolate, espresso coffee, cocoa mass, sugar',
  },
  {
    name: 'Strawberry White Chocolate',
    description: 'Sweet white chocolate with real freeze-dried strawberry pieces. A fruity and creamy combination.',
    price: 289,
    imageUrl: 'https://placehold.co/400x400/ffb6c1/333333?text=Strawberry+White+Chocolate&font=roboto',
    ingredients: 'White chocolate, freeze-dried strawberries, sugar, milk powder',
  },
  {
    name: 'Luxury Gift Box',
    description: 'An exquisite collection of our finest chocolates including dark, milk, white varieties and specialty truffles. 24 pieces.',
    price: 1299,
    imageUrl: 'https://placehold.co/400x400/8b7355/ffffff?text=Luxury+Gift+Box&font=roboto',
    ingredients: 'Assorted premium chocolates with various fillings',
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('🔄 Starting database seed...\n');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('✓ Cleared existing data');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin',
    });
    console.log('✓ Admin user created (email: admin@example.com, password: admin123)');

    // Create regular user
    const userPassword = await bcrypt.hash('user123', 10);
    const user = await User.create({
      email: 'user@example.com',
      password: userPassword,
      role: 'user',
    });
    console.log('✓ Regular user created (email: user@example.com, password: user123)');

    // Add chocolate products
    const products = await Product.insertMany(chocolateProducts);
    console.log(`✓ Added ${products.length} chocolate products\n`);

    console.log('📦 Products added:');
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - ₹${product.price}`);
    });

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Login credentials:');
    console.log('   Admin: admin@example.com / admin123');
    console.log('   User:  user@example.com / user123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
