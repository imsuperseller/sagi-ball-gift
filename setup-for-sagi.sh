#!/bin/bash

echo "🎁 Welcome to your Football Academy Management System!"
echo "This script will help you set up everything for Sagi"
echo ""

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed."
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Prerequisites check passed!"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Create environment file
echo "🔧 Creating environment file..."
if [ ! -f .env.local ]; then
    cat > .env.local << EOF
# Supabase Configuration
# Get these from https://supabase.com/dashboard/project/[YOUR_PROJECT]/settings/api
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url_here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Expo Push Notifications (Optional)
EXPO_PUBLIC_EXPO_ACCESS_TOKEN=your_expo_access_token_here
EOF
    echo "✅ Created .env.local file"
    echo "⚠️  Please edit .env.local with your Supabase credentials"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "🎯 Next Steps:"
echo "1. Go to https://supabase.com and create a new project"
echo "2. Copy your project URL and keys to .env.local"
echo "3. Run 'pnpm dev' to start the development servers"
echo "4. Visit http://localhost:3000 to see the admin dashboard"
echo ""
echo "📱 For mobile app testing:"
echo "1. Install Expo Go on your phone"
echo "2. Run 'pnpm dev:mobile'"
echo "3. Scan the QR code with Expo Go"
echo ""
echo "🚀 For production deployment:"
echo "1. Push this code to your GitHub repository"
echo "2. Connect to Vercel for automatic deployments"
echo "3. Set environment variables in Vercel dashboard"
echo ""
echo "🎉 Enjoy your new football academy management system!"
