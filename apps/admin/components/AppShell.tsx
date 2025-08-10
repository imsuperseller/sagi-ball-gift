'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserCheck, 
  Users2, 
  User, 
  Video, 
  Bell, 
  ClipboardList, 
  Settings,
  Command,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import CommandK from '@/components/CommandK';
import { useI18n } from '@/lib/i18n';

function useNavItems() {
  const { t } = useI18n();
  
  return [
    { href: '/', icon: <ClipboardList className="w-5 h-5" />, label: t.nav.dashboard },
    { href: '/teams', icon: <Users className="w-5 h-5" />, label: t.nav.teams },
    { href: '/players', icon: <UserCheck className="w-5 h-5" />, label: t.nav.players },
    { href: '/coaches', icon: <Users2 className="w-5 h-5" />, label: t.nav.coaches },
    { href: '/routines', icon: <Video className="w-5 h-5" />, label: t.nav.routines },
    { href: '/notifications', icon: <Bell className="w-5 h-5" />, label: t.nav.broadcast },
    { href: '/attendance', icon: <ClipboardList className="w-5 h-5" />, label: t.nav.attendance },
    { href: '/audit', icon: <Settings className="w-5 h-5" />, label: t.nav.audit },
  ];
}

function Logo() {
  return (
    <div className="flex items-center justify-center h-16 border-b border-border/50">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pitch to-accent flex items-center justify-center text-white font-bold text-sm shadow-card">
        סגי
      </div>
    </div>
  );
}

function NavItem({ href, icon, label, isActive }: { href: string; icon: React.ReactNode; label: string; isActive: boolean }) {
  return (
    <Link href={href} className="relative block">
      <motion.div
        className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-xl transition-colors ${
          isActive 
            ? 'bg-pitch text-white shadow-card' 
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-sm font-medium truncate" title={label}>{label}</span>
        {icon}
        {isActive && (
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-l-full"
            layoutId="activeIndicator"
            initial={false}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </motion.div>
    </Link>
  );
}

function TeamSwitcher() {
  return (
    <Button variant="outline" className="gap-2">
      <span className="text-sm font-medium">כל הקבוצות</span>
      <ChevronDown className="w-4 h-4" />
    </Button>
  );
}

function CommandButton({ onOpen }: { onOpen: () => void }) {
  return (
    <Button variant="outline" size="sm" className="gap-2" onClick={onOpen}>
      <Command className="w-4 h-4" />
      <span className="hidden sm:inline">חיפוש</span>
    </Button>
  );
}

function UserMenu() {
  return (
    <div className="flex items-center gap-3">
      <Badge variant="secondary" className="bg-accent/10 text-pitch border-accent/20">
        מנהל
      </Badge>
      <Avatar className="w-8 h-8">
        <AvatarFallback className="bg-pitch text-white text-sm">AF</AvatarFallback>
      </Avatar>
    </div>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [cmdOpen, setCmdOpen] = React.useState(false);
  const navItems = useNavItems();

  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr] bg-bgLight dark:bg-bgDark bg-radial-grid overflow-x-auto">
      {/* Left Rail */}
      <aside className="border-r border-border/50 bg-white/70 dark:bg-white/5 backdrop-blur-xl">
        <Logo />
        <nav className="p-2 space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={pathname === item.href}
            />
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="relative min-w-0">
                            {/* Glass Header */}
                    <header className="sticky top-0 z-40 bg-white/60 dark:bg-bgDark/40 backdrop-blur-xl border-b border-border/50">
                      <div className="flex items-center justify-between gap-3 px-6 h-16">
                        <div className="flex items-center gap-3">
                          <UserMenu />
                          <CommandButton onOpen={() => setCmdOpen(true)} />
                        </div>
                        <div className="flex items-center gap-3">
                          <TeamSwitcher />
                        </div>
                      </div>
                    </header>

        {/* Main Content Area */}
        <main className="p-8 w-full overflow-x-auto" style={{ minWidth: '800px' }}>
          <div className="w-full min-w-0" style={{ minWidth: '800px' }}>
            {children}
          </div>
        </main>
        <CommandK open={cmdOpen} setOpen={setCmdOpen} />
      </div>
    </div>
  );
}
