// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return { valid: false, message: 'Email is required' };
  if (!emailRegex.test(email)) return { valid: false, message: 'Invalid email format' };
  return { valid: true, message: '' };
};

// Password validation
export const validatePassword = (password) => {
  if (!password) return { valid: false, message: 'Password is required' };
  if (password.length < 6) return { valid: false, message: 'Password must be at least 6 characters' };
  return { valid: true, message: '' };
};

// Phone number validation
export const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  if (!phone) return { valid: false, message: 'Phone number is required' };
  if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
    return { valid: false, message: 'Invalid phone number (10 digits required)' };
  }
  return { valid: true, message: '' };
};

// Postal code validation (Indian format)
export const validatePostalCode = (code) => {
  const postalRegex = /^[0-9]{6}$/;
  if (!code) return { valid: false, message: 'Postal code is required' };
  if (!postalRegex.test(code.replace(/\D/g, ''))) {
    return { valid: false, message: 'Invalid postal code (6 digits required)' };
  }
  return { valid: true, message: '' };
};

// Address validation
export const validateAddress = (address) => {
  if (!address) return { valid: false, message: 'Address is required' };
  if (address.trim().length < 5) return { valid: false, message: 'Address too short (minimum 5 characters)' };
  return { valid: true, message: '' };
};

// City validation
export const validateCity = (city) => {
  if (!city) return { valid: false, message: 'City is required' };
  if (city.trim().length < 2) return { valid: false, message: 'Invalid city name' };
  return { valid: true, message: '' };
};

// State validation
export const validateState = (state) => {
  if (!state) return { valid: false, message: 'State is required' };
  if (state.trim().length < 2) return { valid: false, message: 'Invalid state name' };
  return { valid: true, message: '' };
};

// Product name validation
export const validateProductName = (name) => {
  if (!name) return { valid: false, message: 'Product name is required' };
  if (name.trim().length < 3) return { valid: false, message: 'Product name too short' };
  if (name.trim().length > 100) return { valid: false, message: 'Product name too long' };
  return { valid: true, message: '' };
};

// Product price validation
export const validatePrice = (price) => {
  const numPrice = parseFloat(price);
  if (!price || isNaN(numPrice)) return { valid: false, message: 'Price is required and must be a number' };
  if (numPrice <= 0) return { valid: false, message: 'Price must be greater than 0' };
  if (numPrice > 100000) return { valid: false, message: 'Price must be less than 100000' };
  return { valid: true, message: '' };
};

// Image URL validation
export const validateImageUrl = (url) => {
  if (!url) return { valid: false, message: 'Image URL is required' };
  try {
    const urlObj = new URL(url);
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const hasValidExtension = validExtensions.some(ext => urlObj.pathname.toLowerCase().endsWith(ext));
    if (!hasValidExtension) return { valid: false, message: 'Invalid image format (JPG, PNG, GIF, WEBP only)' };
    return { valid: true, message: '' };
  } catch {
    return { valid: false, message: 'Invalid URL format' };
  }
};

// Generic field validation
export const validateField = (value, fieldName, minLength = 1, maxLength = 255) => {
  if (!value) return { valid: false, message: `${fieldName} is required` };
  if (value.trim().length < minLength) {
    return { valid: false, message: `${fieldName} must be at least ${minLength} characters` };
  }
  if (value.trim().length > maxLength) {
    return { valid: false, message: `${fieldName} must be less than ${maxLength} characters` };
  }
  return { valid: true, message: '' };
};

// Validate entire form
export const validateForm = (formData, rules) => {
  const errors = {};
  let isValid = true;

  Object.keys(rules).forEach(field => {
    const validation = rules[field](formData[field]);
    if (!validation.valid) {
      errors[field] = validation.message;
      isValid = false;
    }
  });

  return { isValid, errors };
};
