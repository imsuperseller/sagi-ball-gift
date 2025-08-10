# 🎁 Gift for Sagi - Football Training Academy System

## 🎯 What You're Getting

A complete, production-ready football training academy management system with:

- **Admin Dashboard** (Next.js) - Hebrew interface for managing teams, players, coaches
- **Mobile App** (Expo) - For coaches to log attendance and parents to get notifications
- **Backend** (Supabase) - Database, authentication, and real-time features
- **Full Hebrew Support** - RTL layout, Hebrew translations, local date formatting

## 🚀 Quick Setup (5 minutes)

### 1. Import to Your GitHub
```bash
# Clone this repository
git clone https://github.com/YOUR_USERNAME/sagi-ball.git
cd sagi-ball

# Create your own repository
gh repo create sagi-ball --public --description "Football Training Academy Management System"
git remote set-url origin https://github.com/YOUR_USERNAME/sagi-ball.git
git push -u origin main
```

### 2. Set Up Supabase (Free Tier)
1. Go to [supabase.com](https://supabase.com) and create account
2. Create new project
3. Copy your project URL and anon key
4. Add to Vercel environment variables (see step 3)

### 3. Deploy to Vercel (One Click)
1. Go to [vercel.com](https://vercel.com) and connect your GitHub
2. Import the `sagi-ball` repository
3. Set environment variables:
   ```
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```
4. Deploy! 🎉

## 🎨 Features Included

### Admin Dashboard
- **Dashboard**: Attendance charts, KPI overview
- **Teams**: Create and manage football teams
- **Players**: Manage player roster with parent links
- **Coaches**: Assign coaches to teams
- **Routines**: Create training exercises
- **Attendance**: Track and export attendance logs
- **Notifications**: Send push notifications to parents
- **Audit**: System activity logs

### Mobile App
- **Coach Flow**: Team selection, attendance logging
- **Parent Flow**: Notifications, routine viewing

### Technical Features
- **Hebrew RTL Support**: Complete Hebrew interface
- **Real-time Updates**: Live attendance tracking
- **Push Notifications**: Instant parent alerts
- **Responsive Design**: Works on all devices
- **Type Safety**: Full TypeScript coverage

## 🛠️ Customization

### Change Branding
1. Update logo in `apps/admin/components/AppShell.tsx`
2. Change colors in `apps/admin/app/globals.css`
3. Update app name in `package.json` files

### Add Features
- The codebase is well-structured and documented
- Easy to add new pages, features, or integrations
- Modular design makes extensions simple

## 📱 Mobile App Deployment

### For Coaches/Parents
1. Install Expo Go app on phones
2. Run `pnpm dev:mobile` locally
3. Scan QR code to test
4. For production: `eas build` and distribute

## 🎯 Perfect For
- Football academies
- Youth sports clubs
- Training centers
- Any organization managing teams and attendance

## 💡 Pro Tips
- Start with the admin dashboard to set up teams
- Test the mobile app with Expo Go
- Use Supabase dashboard to monitor data
- Customize colors and branding to match your style

## 🆘 Need Help?
- Check the README.md for detailed setup
- All code is well-commented and documented
- GitHub repository includes issue templates

---

**Made with ❤️ for Sagi** - Enjoy your new football academy management system!
