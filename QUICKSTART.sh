#!/bin/bash
# Quick Start Script for Chocolate Paradise

echo "🍫 Chocolate Paradise - Quick Start"
echo "===================================="
echo ""

# Ensure we run from the script directory
cd "$(dirname "$0")"

echo "Installing root, backend, and frontend dependencies..."
npm install

echo ""
echo "❓ Configure your PostgreSQL database:"
echo "   1. Update DATABASE_URL in chocolate-backend/.env"
echo "   2. Run: createdb chocolate_db"

echo ""
echo "Starting full-stack dev servers (backend:5000, frontend:3000)..."
npm run dev

echo ""
echo "📋 If you stop the servers, restart with:"
echo "   npm run dev"
echo ""
echo "🎉 Happy Shopping!"
