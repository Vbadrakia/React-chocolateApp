/**
 * Performance Configuration & Optimization Settings
 * Configures lazy loading, caching, and other performance enhancements
 */

/**
 * Image optimization settings
 */
export const IMAGE_CONFIG = {
  // Use responsive images
  sizes: {
    thumbnail: 150,
    small: 300,
    medium: 600,
    large: 1200,
  },
  
  // Format preferences
  formats: ['webp', 'jpg'],
  
  // Default placeholder
  placeholder: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f5efea" width="400" height="300"/%3E%3C/svg%3E',
};

/**
 * Cache configuration for API responses
 */
export const CACHE_CONFIG = {
  // Cache duration in milliseconds
  productsCacheDuration: 5 * 60 * 1000, // 5 minutes
  ordersCacheDuration: 2 * 60 * 1000,   // 2 minutes
  userCacheDuration: 10 * 60 * 1000,    // 10 minutes
  
  // Enable service worker caching
  enableServiceWorkerCache: true,
};

/**
 * Lazy loading configuration
 */
export const LAZY_LOAD_CONFIG = {
  // Intersection Observer options
  rootMargin: '50px',
  threshold: 0.1,
  
  // Components to lazy load
  lazyComponents: [
    'ProductDetailsScreen',
    'AdminScreen',
    'DashboardScreen',
  ],
};

/**
 * Bundle optimization settings
 */
export const BUNDLE_CONFIG = {
  // Code splitting thresholds
  minChunkSize: 50000, // 50KB
  maxChunkSize: 500000, // 500KB
  
  // Enable tree shaking
  treeshaking: true,
  
  // Minify and compress
  minify: true,
};

/**
 * Font loading optimization
 */
export const FONT_CONFIG = {
  // Font display strategy
  display: 'swap', // Show fallback immediately
  
  // Preload critical fonts
  preloadFonts: [
    {
      family: 'System Font',
      weight: 400,
      style: 'normal',
    },
    {
      family: 'System Font',
      weight: 600,
      style: 'normal',
    },
  ],
};

/**
 * Performance monitoring settings
 */
export const PERFORMANCE_CONFIG = {
  // Enable performance monitoring
  enableMonitoring: process.env.NODE_ENV === 'development',
  
  // Thresholds for alerts
  thresholds: {
    LCP: 2500, // Largest Contentful Paint (ms)
    FID: 100,  // First Input Delay (ms)
    CLS: 0.1,  // Cumulative Layout Shift
  },
  
  // Sample rate for analytics
  analyticsMaxSampleSize: 100, // events
};

/**
 * Network optimization settings
 */
export const NETWORK_CONFIG = {
  // Request timeout (ms)
  timeout: 10000,
  
  // Max retries for failed requests
  maxRetries: 3,
  
  // Retry delay (ms)
  retryDelay: 1000,
  
  // Enable request batching
  enableBatching: true,
};

/**
 * CSS optimization settings
 */
export const CSS_CONFIG = {
  // Critical CSS inline threshold (bytes)
  criticalCSSThreshold: 15000,
  
  // CSS-in-JS optimization
  enableCSSOptimization: true,
  
  // Purge unused CSS
  purgeUnusedCSS: process.env.NODE_ENV === 'production',
};

/**
 * JavaScript optimization settings
 */
export const JS_CONFIG = {
  // Babel polyfill strategy
  polyfillStrategy: 'usage', // Only include needed polyfills
  
  // Enable async/await compilation
  asyncAwaitOptimization: true,
  
  // Dynamic import support
  dynamicImportSupport: true,
};

export default {
  IMAGE_CONFIG,
  CACHE_CONFIG,
  LAZY_LOAD_CONFIG,
  BUNDLE_CONFIG,
  FONT_CONFIG,
  PERFORMANCE_CONFIG,
  NETWORK_CONFIG,
  CSS_CONFIG,
  JS_CONFIG,
};
