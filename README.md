# SagiBall - Football Training Academy Management System

A comprehensive monorepo for managing a football training academy with separate apps for coaches/parents (mobile) and administrators (web).

## 🏗️ Architecture

This is a **monorepo** built with:
- **TurboRepo** for build orchestration
- **pnpm** for package management
- **TypeScript** throughout
- **Supabase** for backend (Postgres, Auth, Storage, Edge Functions)

## 📱 Apps

### `apps/admin` - Admin Dashboard (Next.js 14)
- **Framework**: Next.js 14 with App Router
- **UI**: Shadcn/ui + Tailwind CSS
- **Language**: Hebrew (RTL) with i18n support
- **Features**:
  - Team management
  - Player roster
  - Coach assignments
  - Training routines
  - Attendance tracking
  - Push notifications
  - Audit logging

### `apps/mobile` - Mobile App (Expo React Native)
- **Framework**: Expo SDK 50
- **UI**: NativeWind (Tailwind for React Native)
- **Features**:
  - Coach attendance logging
  - Parent notifications
  - Training routine viewing
  - Push notifications

## 📦 Packages

### `packages/types` - Shared TypeScript Types
- Zod schemas for validation
- TypeScript interfaces
- i18n translations

### `packages/ui` - Shared UI Components
- React Native components
- Cross-platform design system

### `packages/api` - Shared API SDK
- Typed Supabase client
- Helper functions
- Expo push notification utilities

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm
- Supabase CLI

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd sagi-ball

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development servers
pnpm dev
```

### Environment Variables
Create `.env.local` in the root:
```env
# Supabase
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Expo Push Notifications
EXPO_PUBLIC_EXPO_ACCESS_TOKEN=your_expo_access_token
```

## 🗄️ Database Schema

The system uses Supabase with the following main tables:
- `profiles` - User profiles with roles (admin, coach, parent)
- `teams` - Football teams
- `players` - Player information
- `attendance_logs` - Attendance tracking
- `training_routines` - Training exercises
- `admin_notifications` - Push notifications
- `audit_log` - System audit trail

## 🌐 Internationalization

The admin app supports Hebrew as the primary language with RTL layout:
- Complete Hebrew translations
- Right-to-left text flow
- Hebrew date/time formatting
- RTL-aware UI components

## 📊 Features

### Admin Dashboard
- **Dashboard**: KPI overview with attendance charts
- **Teams**: Create and manage football teams
- **Players**: Manage player roster and parent links
- **Coaches**: Assign coaches to teams
- **Routines**: Create and assign training exercises
- **Attendance**: Track and export attendance logs
- **Notifications**: Send push notifications to parents
- **Audit**: View system activity logs

### Mobile App
- **Coach Flow**: Team selection, attendance logging, routine viewing
- **Parent Flow**: Notifications, routine viewing, player information

## 🚀 Deployment

### Vercel (Admin App)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Expo (Mobile App)
1. Build with EAS: `eas build`
2. Submit to app stores: `eas submit`

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm --filter @sagi-ball/api test
```

## 📝 Development

### Adding New Features
1. Create feature branch: `git checkout -b feature/new-feature`
2. Implement in appropriate app/package
3. Add tests
4. Update documentation
5. Create pull request

### Code Style
- TypeScript strict mode
- ESLint + Prettier
- Conventional commits
- Husky pre-commit hooks

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support, please open an issue in the GitHub repository.


