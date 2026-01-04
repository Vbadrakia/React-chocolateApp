import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Award,
  Shield,
  Truck,
  Users,
  Sparkles,
  Package
} from 'lucide-react';

const ChocolateShop = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/40 via-transparent to-transparent"></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4 sm:mb-6 inline-flex items-center bg-gradient-to-r from-amber-600 to-rose-600 text-white px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm rounded-full shadow-lg">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Premium Artisan Chocolates
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-amber-900 via-rose-900 to-purple-900 bg-clip-text text-transparent leading-tight px-4">
              Indulge in Luxury
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto mb-8 sm:mb-12 px-4">
              Handcrafted Belgian chocolates made with the finest ingredients from around the world
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4">
              <button 
                onClick={() => navigate('/products')}
                className="w-full sm:w-auto px-8 py-4 text-base sm:text-lg bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white rounded-full shadow-xl transition-all flex items-center justify-center font-semibold"
              >
                Shop Collection
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto px-8 py-4 text-base sm:text-lg border-2 border-amber-900 text-amber-900 rounded-full hover:bg-amber-50 bg-transparent transition-all font-semibold"
              >
                Sign In
              </button>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-900 to-rose-900 bg-clip-text text-transparent">
              Trusted Worldwide
            </h2>
            <p className="text-base sm:text-xl text-gray-600">Excellence in every bite, proven by our achievements</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Award, value: '50+', label: 'Awards' },
              { icon: Users, value: '100K+', label: 'Customers' },
              { icon: Truck, value: '25+', label: 'Years' },
              { icon: Shield, value: '100%', label: 'Quality' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-rose-100 mb-4">
                    <Icon className="w-8 h-8 text-amber-900" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-amber-900 mb-2">{stat.value}</div>
                  <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-900 to-rose-900 bg-clip-text text-transparent">
              Featured Collection
            </h2>
            <p className="text-base sm:text-xl text-gray-600">Discover our handcrafted masterpieces</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { name: 'Dark Chocolate Truffles', price: 24.99, rating: 4.9, image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800' },
              { name: 'Milk Chocolate Assortment', price: 29.99, rating: 4.8, image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800' },
              { name: 'Luxury Gift Box', price: 49.99, rating: 5.0, image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800' }
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group cursor-pointer"
                onClick={() => navigate('/products')}
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                  <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors">
                    <Heart className="h-5 w-5 text-gray-700" />
                  </button>
                </div>
                
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <span className="ml-1 text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">(200+ reviews)</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-900">${product.price}</span>
                    <button className="px-4 py-2 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white rounded-lg text-sm font-semibold transition-all flex items-center">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/products')}
              className="px-8 py-4 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white rounded-full text-lg font-semibold shadow-xl transition-all inline-flex items-center"
            >
              View All Products
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-900 to-rose-900 bg-clip-text text-transparent">
              Why Choose Us
            </h2>
            <p className="text-base sm:text-xl text-gray-600">Experience the difference of true craftsmanship</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Shield, title: 'Premium Quality', desc: 'Only the finest Belgian chocolate' },
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: Package, title: 'Fresh Daily', desc: 'Handcrafted every morning' },
              { icon: Award, title: 'Award Winning', desc: 'Recognized globally' }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-amber-50 to-rose-50 p-6 rounded-2xl hover:shadow-lg transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-md mb-4">
                    <Icon className="w-7 h-7 text-amber-900" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-amber-900 via-rose-900 to-purple-900">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Experience Luxury?
            </h2>
            <p className="text-lg sm:text-xl text-amber-100 mb-8">
              Join thousands of satisfied customers and discover why our chocolates are rated 5 stars
            </p>
            <button 
              onClick={() => navigate('/signup')}
              className="px-8 py-4 bg-white text-amber-900 rounded-full text-lg font-semibold shadow-xl hover:bg-amber-50 transition-all inline-flex items-center"
            >
              Get Started Today
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Luxe Chocolate</h3>
              <p className="text-sm">Premium artisan chocolates crafted with passion and expertise.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigate('/products')} className="hover:text-amber-400 transition-colors">All Products</button></li>
                <li><button onClick={() => navigate('/products')} className="hover:text-amber-400 transition-colors">New Arrivals</button></li>
                <li><button onClick={() => navigate('/products')} className="hover:text-amber-400 transition-colors">Best Sellers</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Returns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <button className="w-10 h-10 bg-gray-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-gray-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors">
                  <Instagram className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-gray-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 Luxe Chocolate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export { ChocolateShop };
export default ChocolateShop;
