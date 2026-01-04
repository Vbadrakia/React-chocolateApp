import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Check, 
  X, 
  Menu,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Award,
  Shield,
  Truck,
  Clock,
  Users,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

// Utility function
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Hero Section
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/40 via-transparent to-transparent"></div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-amber-600 to-rose-600 text-white border-0 px-3 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm inline-block">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2 inline" />
            Premium Artisan Chocolates
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-amber-900 via-rose-900 to-purple-900 bg-clip-text text-transparent leading-tight">
            Indulge in Luxury
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto mb-8 sm:mb-12 px-2">
            Handcrafted Belgian chocolates made with the finest ingredients from around the world
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full px-2">
            <Button className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-lg bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white rounded-full shadow-xl">
              Shop Collection
              <ChevronRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
            </Button>
            <Button variant="outline" className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-lg border-2 border-amber-900 text-amber-900 rounded-full hover:bg-amber-50">
              Our Story
            </Button>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

// Proof Section
const ProofSection = () => {
  const stats = [
    { icon: Award, value: '50+', label: 'International Awards' },
    { icon: Users, value: '100K+', label: 'Happy Customers' },
    { icon: TrendingUp, value: '25+', label: 'Years of Excellence' },
    { icon: Shield, value: '100%', label: 'Quality Guaranteed' }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-amber-900 to-rose-900 bg-clip-text text-transparent">
            Trusted by Connoisseurs Worldwide
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-gray-600 px-2">Excellence in every bite, proven by our achievements</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-amber-100 to-rose-100 mb-2 sm:mb-3 md:mb-4">
                <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-amber-900" />
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900 mb-1 sm:mb-2">{stat.value}</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Product Card Component
const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <Card className="w-full overflow-hidden group bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl border-0">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <motion.img
          key={currentImageIndex}
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="object-cover w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1 sm:gap-2">
          {product.isNew && (
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 text-xs sm:text-sm">New</Badge>
          )}
          {product.isBestSeller && (
            <Badge className="bg-gradient-to-r from-amber-500 to-rose-500 text-white border-0 text-xs sm:text-sm">Best Seller</Badge>
          )}
          {product.discount && (
            <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white border-0 text-xs sm:text-sm">-{product.discount}%</Badge>
          )}
        </div>
        
        <Button
          variant="secondary"
          size="icon"
          className={cn(
            "absolute top-2 sm:top-3 right-2 sm:right-3 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg",
            isWishlisted && "text-rose-500"
          )}
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart className={cn("h-4 sm:h-5 w-4 sm:w-5", isWishlisted && "fill-rose-500")} />
        </Button>
      </div>
      
      <CardContent className="p-3 sm:p-4 md:p-6">
        <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-2 text-gray-900">{product.name}</h3>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="flex items-center">
            <Star className="h-3 sm:h-4 w-3 sm:w-4 fill-amber-500 text-amber-500" />
            <span className="ml-1 text-xs sm:text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>
        
        <div className="flex items-baseline gap-2 mb-3 sm:mb-4">
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-amber-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xs sm:text-sm text-gray-500 line-through">${product.originalPrice}</span>
          )}
        </div>
        
        <div className="flex gap-1 sm:gap-2 mb-3 sm:mb-4">
          {product.colors.map((color) => (
            <button
              key={color}
              className={cn(
                "w-6 h-6 sm:w-8 sm:h-8 rounded-full transition-all",
                selectedColor === color ? "ring-2 ring-amber-900 ring-offset-2" : "ring-1 ring-gray-300"
              )}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="p-3 sm:p-4 md:p-6 pt-0">
        <Button className="w-full bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white rounded-xl text-sm sm:text-base py-2 sm:py-3">
          <ShoppingCart className="mr-1 sm:mr-2 h-4 sm:h-5 w-4 sm:w-5" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

// Features Section
const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: 'Premium Quality',
      description: 'Only the finest Belgian chocolate and premium ingredients'
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Complimentary delivery on orders over $50'
    },
    {
      icon: Clock,
      title: 'Fresh Daily',
      description: 'Handcrafted fresh every morning by master chocolatiers'
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized globally for excellence in chocolate making'
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-amber-50 to-rose-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-amber-900 to-rose-900 bg-clip-text text-transparent">
            Why Choose Us
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-gray-600 px-2">Experience the difference of true craftsmanship</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-100 to-rose-100 mb-3 sm:mb-4 md:mb-6">
                <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-amber-900" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing Section
const PricingSection = () => {
  const plans = [
    {
      name: 'Starter Box',
      price: 32,
      desc: 'Perfect for trying our signature collection',
      features: [
        '12 Premium Chocolates',
        'Signature Gift Box',
        'Tasting Guide',
        'Free Shipping'
      ]
    },
    {
      name: 'Connoisseur Box',
      price: 65,
      desc: 'Our most popular selection for chocolate lovers',
      features: [
        '24 Premium Chocolates',
        'Luxury Gift Box',
        'Tasting Guide',
        'Free Shipping',
        'Personalized Card',
        'Priority Support'
      ],
      popular: true
    },
    {
      name: 'Grand Collection',
      price: 120,
      desc: 'The ultimate chocolate experience',
      features: [
        '48 Premium Chocolates',
        'Deluxe Gift Box',
        'Detailed Tasting Guide',
        'Free Express Shipping',
        'Personalized Card',
        'VIP Support',
        'Exclusive Flavors',
        'Monthly Newsletter'
      ]
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-amber-900 to-rose-900 bg-clip-text text-transparent">
            Choose Your Experience
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-gray-600 px-2">Curated collections for every occasion</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border-2 transition-all hover:shadow-2xl",
                plan.popular ? "border-amber-600 md:scale-105" : "border-gray-200"
              )}
            >
              {plan.popular && (
                <Badge className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-600 to-rose-600 text-white border-0 text-xs sm:text-sm">
                  Most Popular
                </Badge>
              )}
              
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">{plan.name}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4">{plan.desc}</p>
                <div className="text-3xl sm:text-4xl font-bold text-amber-900">
                  ${plan.price}
                  <span className="text-sm sm:text-lg font-normal text-gray-600">/box</span>
                </div>
              </div>
              
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button className={cn(
                "w-full rounded-xl py-3 sm:py-4 md:py-6 text-sm sm:text-base",
                plan.popular 
                  ? "bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              )}>
                Select Plan
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      initials: 'SM',
      name: 'Sarah Mitchell',
      role: 'Chocolate Enthusiast',
      quote: "The most exquisite chocolates I've ever tasted. Each piece is a work of art, and the flavors are absolutely divine. Worth every penny!",
      avatarGradient: 'linear-gradient(135deg, #8B5CF6, #D946EF)'
    },
    {
      id: 2,
      initials: 'JD',
      name: 'James Davidson',
      role: 'Corporate Gifting Manager',
      quote: "We've been ordering from them for our corporate gifts for years. The quality is consistently exceptional, and our clients are always impressed.",
      avatarGradient: 'linear-gradient(135deg, #F59E0B, #D97706)'
    },
    {
      id: 3,
      initials: 'ER',
      name: 'Emily Rodriguez',
      role: 'Food Critic',
      quote: "As a professional food critic, I can confidently say these are among the finest chocolates available. The attention to detail is remarkable.",
      avatarGradient: 'linear-gradient(135deg, #10B981, #059669)'
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-amber-900 to-rose-900 bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-gray-600 px-2">Loved by chocolate connoisseurs worldwide</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 md:mb-6">
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base"
                  style={{ background: testimonial.avatarGradient }}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-sm sm:text-base text-gray-900">{testimonial.name}</h4>
                  <p className="text-xs sm:text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">"{testimonial.quote}"</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 fill-amber-500 text-amber-500" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-amber-900 to-rose-900 bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600 mb-6 sm:mb-8">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-amber-900" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Email</h4>
                  <p className="text-xs sm:text-sm text-gray-600">contact@luxechocolate.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-amber-900" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Phone</h4>
                  <p className="text-xs sm:text-sm text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-amber-900" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Address</h4>
                  <p className="text-xs sm:text-sm text-gray-600">123 Chocolate Lane, Brussels, Belgium</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-2xl p-4 sm:p-6 md:p-8">
            <form className="space-y-3 sm:space-y-4 md:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none text-sm"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none text-sm"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-2">Message</label>
                <textarea 
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none resize-none text-sm"
                  placeholder="Your message..."
                />
              </div>
              
              <Button className="w-full bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white rounded-xl py-3 sm:py-4 md:py-6 text-sm sm:text-base">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-8 sm:py-12 md:py-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">
              LuxeChocolate
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
              Crafting exceptional chocolate experiences since 1998
            </p>
            <div className="flex gap-2 sm:gap-3">
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm sm:text-base mb-2 sm:mb-3 md:mb-4">Shop</h4>
            <ul className="space-y-1 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
              <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gift Boxes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Seasonal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Corporate Gifts</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm sm:text-base mb-2 sm:mb-3 md:mb-4">Company</h4>
            <ul className="space-y-1 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm sm:text-base mb-2 sm:mb-3 md:mb-4">Support</h4>
            <ul className="space-y-1 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400">
          <p>&copy; 2024 LuxeChocolate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main Component
export const ChocolateShop = () => {
  const products = [
    {
      id: '1',
      name: 'Dark Truffle Collection',
      price: 45,
      originalPrice: 60,
      rating: 4.9,
      reviewCount: 234,
      images: ['https://images.unsplash.com/photo-1511381939415-e44015466834?w=800', 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800'],
      colors: ['#3B2414', '#6B4423', '#8B5A3C'],
      sizes: ['6pc', '12pc', '24pc'],
      isNew: true,
      isBestSeller: true,
      discount: 25,
      freeShipping: true,
      description: 'Premium dark chocolate truffles'
    },
    {
      id: '2',
      name: 'Milk Chocolate Assortment',
      price: 38,
      rating: 4.8,
      reviewCount: 189,
      images: ['https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800', 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800'],
      colors: ['#8B4513', '#A0522D', '#CD853F'],
      sizes: ['6pc', '12pc', '24pc'],
      isBestSeller: true,
      freeShipping: true,
      description: 'Smooth milk chocolate selection'
    },
    {
      id: '3',
      name: 'White Chocolate Delights',
      price: 42,
      originalPrice: 55,
      rating: 4.7,
      reviewCount: 156,
      images: ['https://images.unsplash.com/photo-1511381939415-e44015466834?w=800', 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800'],
      colors: ['#F5F5DC', '#FFFACD', '#FFF8DC'],
      sizes: ['6pc', '12pc', '24pc'],
      isNew: true,
      discount: 20,
      freeShipping: true,
      description: 'Creamy white chocolate treats'
    },
    {
      id: '4',
      name: 'Hazelnut Praline Selection',
      price: 52,
      rating: 4.9,
      reviewCount: 298,
      images: ['https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800', 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800'],
      colors: ['#C19A6B', '#8B7355', '#A0826D'],
      sizes: ['6pc', '12pc', '24pc'],
      isBestSeller: true,
      freeShipping: true,
      description: 'Roasted hazelnut pralines in premium chocolate'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ProofSection />
      
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-amber-900 to-rose-900 bg-clip-text text-transparent">
              Featured Collection
            </h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600 px-2">Discover our handcrafted masterpieces</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default ChocolateShop;
