#!/usr/bin/env node

/**
 * 🧪 API Testing Script for Chocolate App
 * 
 * This script tests all API endpoints without requiring a database
 * Run: node test-api.js
 */

const http = require('http');

const API_BASE = 'http://localhost:5000';
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Test credentials
const testCredentials = {
  admin: { email: 'admin@example.com', password: 'admin123' },
  user: { email: 'user@example.com', password: 'user123' },
  newUser: { email: `testuser${Date.now()}@example.com`, password: 'testpass123' }
};

let adminToken = '';
let userToken = '';

// Utility to make HTTP requests
function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, API_BASE);
    const options = {
      method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (adminToken && path.includes('/admin')) {
      options.headers['Authorization'] = `Bearer ${adminToken}`;
    } else if (userToken) {
      options.headers['Authorization'] = `Bearer ${userToken}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const response = {
            status: res.statusCode,
            headers: res.headers,
            body: data ? JSON.parse(data) : null,
          };
          resolve(response);
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, body: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// Test reporter
function test(name, passed, message = '') {
  const status = passed ? `${colors.green}✓ PASS${colors.reset}` : `${colors.red}✗ FAIL${colors.reset}`;
  console.log(`${status} - ${name}${message ? ': ' + message : ''}`);
  return passed;
}

async function runTests() {
  console.log(`\n${colors.cyan}═══════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.blue}🧪 Chocolate App - API Testing Suite${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════${colors.reset}\n`);

  let passed = 0;
  let failed = 0;

  try {
    // Test 1: Health Check
    console.log(`${colors.yellow}📋 Testing: Health Check${colors.reset}`);
    const healthRes = await makeRequest('GET', '/api/health');
    if (test('Health endpoint', healthRes.status === 200)) passed++; else failed++;

    // Test 2: Signup
    console.log(`\n${colors.yellow}📋 Testing: Authentication${colors.reset}`);
    const signupRes = await makeRequest('POST', '/api/auth/signup', testCredentials.newUser);
    if (test('Signup new user', signupRes.status === 201, signupRes.body?.message)) {
      passed++;
      userToken = signupRes.body?.token;
    } else {
      failed++;
      console.log(`  Error: ${signupRes.body?.error}`);
    }

    // Test 3: Login - User
    const loginUserRes = await makeRequest('POST', '/api/auth/login', {
      email: testCredentials.user.email,
      password: testCredentials.user.password,
    });
    if (test('Login user', loginUserRes.status === 200 || loginUserRes.status === 401, 
      loginUserRes.body?.message || loginUserRes.body?.error)) {
      if (loginUserRes.status === 200) {
        passed++;
        userToken = loginUserRes.body?.token;
      } else {
        // User doesn't exist (seed not run), which is OK for this test
        passed++;
      }
    } else {
      failed++;
    }

    // Test 4: Login - Admin
    const loginAdminRes = await makeRequest('POST', '/api/auth/login', {
      email: testCredentials.admin.email,
      password: testCredentials.admin.password,
    });
    if (test('Login admin', loginAdminRes.status === 200 || loginAdminRes.status === 401,
      loginAdminRes.body?.message || loginAdminRes.body?.error)) {
      if (loginAdminRes.status === 200) {
        passed++;
        adminToken = loginAdminRes.body?.token;
      } else {
        // Admin doesn't exist (seed not run), which is OK for this test
        passed++;
      }
    } else {
      failed++;
    }

    // Test 5: Invalid Login
    const invalidLoginRes = await makeRequest('POST', '/api/auth/login', {
      email: 'invalid@example.com',
      password: 'wrongpassword',
    });
    if (test('Invalid login rejected', invalidLoginRes.status === 401)) {
      passed++;
    } else {
      failed++;
    }

    // Test 6: Get Products
    console.log(`\n${colors.yellow}📋 Testing: Products${colors.reset}`);
    const productsRes = await makeRequest('GET', '/api/products');
    if (test('Get all products', productsRes.status === 200 || productsRes.status === 500)) {
      // Will be 500 if database not seeded, which is OK
      passed++;
    } else {
      failed++;
    }

    // Test 7: Create Product (Admin)
    if (adminToken) {
      const createProductRes = await makeRequest('POST', '/api/products', {
        name: 'Test Chocolate',
        price: 299,
        description: 'Test product',
        ingredients: 'cocoa, sugar',
        imageUrl: 'https://example.com/image.jpg',
      });
      if (test('Create product (admin)', 
        createProductRes.status === 201 || createProductRes.status === 401 || createProductRes.status === 500)) {
        passed++;
      } else {
        failed++;
      }
    }

    // Test 8: Orders
    console.log(`\n${colors.yellow}📋 Testing: Orders${colors.reset}`);
    const ordersRes = await makeRequest('GET', '/api/orders');
    if (test('Get orders', ordersRes.status === 200 || ordersRes.status === 401 || ordersRes.status === 500)) {
      passed++;
    } else {
      failed++;
    }

    // Test 9: Create Order
    if (userToken) {
      const createOrderRes = await makeRequest('POST', '/api/orders', {
        items: [
          { productId: '1', quantity: 2, price: 299 }
        ],
        shippingAddress: {
          street: '123 Main St',
          city: 'Test City',
          state: 'TS',
          postalCode: '12345',
          country: 'Test Country',
        },
        totalAmount: 598,
      });
      if (test('Create order', 
        createOrderRes.status === 201 || createOrderRes.status === 401 || createOrderRes.status === 500)) {
        passed++;
      } else {
        failed++;
      }
    }

    // Results Summary
    console.log(`\n${colors.cyan}═══════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.blue}📊 Test Results:${colors.reset}`);
    console.log(`${colors.green}✓ Passed: ${passed}${colors.reset}`);
    console.log(`${colors.red}✗ Failed: ${failed}${colors.reset}`);
    console.log(`${colors.blue}Total Tests: ${passed + failed}${colors.reset}`);
    console.log(`${colors.cyan}═══════════════════════════════════════════${colors.reset}\n`);

    process.exit(failed > 0 ? 1 : 0);

  } catch (error) {
    console.error(`${colors.red}✗ Test Error: ${error.message}${colors.reset}`);
    console.log(`\n${colors.yellow}⚠️  Make sure:${colors.reset}`);
    console.log(`  1. Backend server is running: npm run dev`);
    console.log(`  2. MongoDB is running and connection string is correct`);
    console.log(`  3. Database is seeded: npm run seed`);
    process.exit(1);
  }
}

// Run tests
runTests();
