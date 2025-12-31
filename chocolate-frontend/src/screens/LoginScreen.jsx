import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../utils/validation';
import './Auth.css';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = '';
    if (name === 'email') {
      const validation = validateEmail(value);
      error = validation.valid ? '' : validation.message;
    } else if (name === 'password') {
      const validation = validatePassword(value);
      error = validation.valid ? '' : validation.message;
    }
    return error;
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, name === 'email' ? email : password);
    if (error) {
      setErrors({ ...errors, [name]: error });
    } else {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
    
    if (touched[name]) {
      const error = validateField(name, value);
      if (error) {
        setErrors({ ...errors, [name]: error });
      } else {
        const newErrors = { ...errors };
        delete newErrors[name];
        setErrors(newErrors);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setGeneralError('');

    // Validate all fields
    const emailError = validateField('email', email);
    const passwordError = validateField('password', password);

    if (emailError || passwordError) {
      setErrors({
        ...(emailError && { email: emailError }),
        ...(passwordError && { password: passwordError }),
      });
      setTouched({ email: true, password: true });
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login(email, password);
      login(response.data.user, response.data.token);
      navigate('/products');
    } catch (err) {
      setGeneralError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = email && password && !errors.email && !errors.password;

  return (
    <div className="auth-container">
      <div className="auth-form animate-fade-up">
        <h1>Login</h1>
        <p className="auth-subtitle">Welcome back! Please sign in to continue.</p>
        {generalError && <div className="alert alert-error">{generalError}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="you@example.com"
              autoComplete="email"
              className={errors.email && touched.email ? 'input-error' : ''}
            />
            {errors.email && touched.email && (
              <div className="form-error">{errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your password"
                autoComplete="current-password"
                className={errors.password && touched.password ? 'input-error' : ''}
              />
              <button
                type="button"
                className="toggle-visibility"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && touched.password && (
              <div className="form-error">{errors.password}</div>
            )}
            {!errors.password && !touched.password && (
              <div className="form-helper">Minimum 6 characters.</div>
            )}
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>

        <div className="demo-info">
          <p><strong>Demo Credentials:</strong></p>
          <p>User: user@example.com · user123</p>
          <p>Admin: admin@example.com · admin123</p>
        </div>
      </div>
    </div>
  );
};
