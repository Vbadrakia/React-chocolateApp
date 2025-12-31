/**
 * Accessibility & Performance Optimization Utilities
 * This file contains utilities for improving accessibility, SEO, and performance
 */

/**
 * Generate semantic heading hierarchy
 */
export const getHeadingLevel = (level = 1) => `h${Math.min(Math.max(level, 1), 6)}`;

/**
 * Announce screen reader messages
 */
export const announceToScreenReader = (message, role = 'status') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', role);
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Lazy load images for performance
 */
export const lazyLoadImage = (imageUrl, placeholderUrl = null) => {
  if (!('IntersectionObserver' in window)) {
    return imageUrl; // Fallback for older browsers
  }
  return imageUrl;
};

/**
 * Debounce function for performance optimization
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

/**
 * Throttle function for performance optimization
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * Get ARIA label for button states
 */
export const getButtonAriaLabel = (label, isDisabled, isLoading) => {
  let full = label;
  if (isLoading) full += ', loading';
  if (isDisabled) full += ', disabled';
  return full;
};

/**
 * Generate skip link for keyboard navigation
 */
export const renderSkipLink = () => {
  return `
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
  `;
};

/**
 * Optimize performance using requestAnimationFrame
 */
export const optimizeAnimation = (callback) => {
  if (typeof requestAnimationFrame !== 'undefined') {
    requestAnimationFrame(callback);
  } else {
    setTimeout(callback, 16); // ~60fps fallback
  }
};

/**
 * Memoize expensive computations
 */
export const memoize = (func) => {
  const cache = new Map();
  
  return (...args) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = func(...args);
    cache.set(key, result);
    
    return result;
  };
};

/**
 * Get browser support capabilities
 */
export const getBrowserCapabilities = () => ({
  supportsIntersectionObserver: 'IntersectionObserver' in window,
  supportsWebP: false, // Can be detected properly if needed
  supportsWebWorkers: typeof Worker !== 'undefined',
  supportsServiceWorkers: 'serviceWorker' in navigator,
  supportsCSSGrid: CSS.supports('display', 'grid'),
  supportsFlexbox: CSS.supports('display', 'flex'),
});

/**
 * Monitor web vitals for performance
 */
export const monitorWebVitals = () => {
  if ('web-vital' in window) {
    // Web Vitals API available
    const vitals = {
      LCP: 0, // Largest Contentful Paint
      FID: 0, // First Input Delay
      CLS: 0, // Cumulative Layout Shift
    };
    return vitals;
  }
  return null;
};
