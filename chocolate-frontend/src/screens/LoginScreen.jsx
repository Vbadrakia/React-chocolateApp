import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div style={{
        background: 'linear-gradient(180deg, #2d1810 0%, #1a0f0a 50%, #0d0603 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 20px 40px',
        paddingTop: '120px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Orbs */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(139,69,19,0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-50px',
          left: '-100px',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(160,82,45,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            padding: '60px 50px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            maxWidth: '450px',
            width: '100%',
            position: 'relative',
            zIndex: 2
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '800',
              color: '#1a1a1a',
              marginBottom: '12px'
            }}>
              Welcome Back
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#6b7280'
            }}>
              Sign in to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#d2a679',
                marginBottom: '8px'
              }}>
                Email Address
              </label>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Mail size={18} style={{
                  position: 'absolute',
                  left: '16px',
                  color: '#d2a679'
                }} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 48px',
                    fontSize: '16px',
                    border: '2px solid rgba(212, 165, 116, 0.2)',
                    borderRadius: '14px',
                    background: 'rgba(212, 165, 116, 0.05)',
                    outline: 'none',
                    transition: 'all 0.3s',
                    fontFamily: 'inherit',
                    color: '#1a1a1a'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#d4a574';
                    e.target.style.background = 'rgba(212, 165, 116, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(212, 165, 116, 0.2)';
                    e.target.style.background = 'rgba(212, 165, 116, 0.05)';
                  }}
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#d2a679',
                marginBottom: '8px'
              }}>
                Password
              </label>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Lock size={18} style={{
                  position: 'absolute',
                  left: '16px',
                  color: '#d2a679'
                }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 48px 14px 48px',
                    fontSize: '16px',
                    border: '2px solid rgba(212, 165, 116, 0.2)',
                    borderRadius: '14px',
                    background: 'rgba(212, 165, 116, 0.05)',
                    outline: 'none',
                    transition: 'all 0.3s',
                    fontFamily: 'inherit',
                    color: '#1a1a1a'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#d4a574';
                    e.target.style.background = 'rgba(212, 165, 116, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(212, 165, 116, 0.2)';
                    e.target.style.background = 'rgba(212, 165, 116, 0.05)';
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#d2a679'
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </motion.button>
              </div>
            </motion.div>

            {/* Sign In Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              style={{
                padding: '14px',
                background: 'linear-gradient(135deg, #d4a574 0%, #c9985a 100%)',
                color: '#1a0f0a',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                marginTop: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 10px 30px rgba(212, 165, 116, 0.3)',
                transition: 'all 0.3s'
              }}
            >
              Sign In
              <ArrowRight size={18} />
            </motion.button>
          </form>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: '24px 0',
            color: '#d2a679'
          }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(212, 165, 116, 0.2)' }} />
            <span style={{ fontSize: '13px' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(212, 165, 116, 0.2)' }} />
          </div>

          {/* Footer */}
          <p style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#d2a679'
          }}>
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              style={{
                background: 'none',
                border: 'none',
                color: '#d4a574',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '14px',
                textDecoration: 'underline'
              }}
            >
              Sign up
            </button>
          </p>
        </motion.div>
      </div>
    </>
  );
};
