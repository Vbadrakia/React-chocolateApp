import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const SignupScreen = () => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const passwordStrength = formData.password.length >= 8;

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
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Orbs */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          left: '-100px',
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
          right: '-100px',
          width: '350px',
          height: '350px',
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
            maxWidth: '480px',
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
              Create Account
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#6b7280'
            }}>
              Join us for premium chocolate
            </p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Email Field */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Email Address
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Mail size={18} style={{ position: 'absolute', left: '16px', color: '#9ca3af' }} />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 48px',
                    fontSize: '16px',
                    border: '2px solid rgba(102, 126, 234, 0.2)',
                    borderRadius: '14px',
                    background: 'rgba(102, 126, 234, 0.05)',
                    outline: 'none',
                    transition: 'all 0.3s',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                    e.target.style.background = 'rgba(102, 126, 234, 0.05)';
                  }}
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Password
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Lock size={18} style={{ position: 'absolute', left: '16px', color: '#9ca3af' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '14px 48px 14px 48px',
                    fontSize: '16px',
                    border: '2px solid rgba(102, 126, 234, 0.2)',
                    borderRadius: '14px',
                    background: 'rgba(102, 126, 234, 0.05)',
                    outline: 'none',
                    transition: 'all 0.3s',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                    e.target.style.background = 'rgba(102, 126, 234, 0.05)';
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
                    color: '#9ca3af'
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </motion.button>
              </div>
              {/* Password Strength Indicator */}
              {formData.password && (
                <div style={{
                  marginTop: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  color: passwordStrength ? '#10b981' : '#ef4444'
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: passwordStrength ? '#10b981' : '#ef4444'
                  }} />
                  {passwordStrength ? 'Strong password' : 'Min 8 characters'}
                </div>
              )}
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Lock size={18} style={{ position: 'absolute', left: '16px', color: '#9ca3af' }} />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '14px 48px 14px 48px',
                    fontSize: '16px',
                    border: '2px solid rgba(102, 126, 234, 0.2)',
                    borderRadius: '14px',
                    background: 'rgba(102, 126, 234, 0.05)',
                    outline: 'none',
                    transition: 'all 0.3s',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                    e.target.style.background = 'rgba(102, 126, 234, 0.05)';
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
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
                    color: formData.password === formData.confirmPassword && formData.password ? '#10b981' : '#9ca3af'
                  }}
                >
                  {formData.password === formData.confirmPassword && formData.password ? (
                    <Check size={18} />
                  ) : (
                    showConfirm ? <EyeOff size={18} /> : <Eye size={18} />
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Sign Up Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                padding: '16px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '14px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s'
              }}
            >
              Create Account
              <ArrowRight size={18} />
            </motion.button>
          </form>

          {/* Footer */}
          <p style={{
            textAlign: 'center',
            fontSize: '15px',
            color: '#6b7280',
            marginTop: '32px'
          }}>
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'none',
                border: 'none',
                color: '#667eea',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '15px'
              }}
            >
              Sign in
            </button>
          </p>
        </motion.div>
      </div>
    </>
  );
};
