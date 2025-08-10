"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ClipboardList, Users, UserCheck, Users2, Video, Bell, Settings } from "lucide-react";

const links = [
  { href: "/", label: "Dashboard", icon: <ClipboardList className="w-4 h-4" /> },
  { href: "/teams", label: "Teams", icon: <Users className="w-4 h-4" /> },
  { href: "/players", label: "Players", icon: <UserCheck className="w-4 h-4" /> },
  { href: "/coaches", label: "Coaches", icon: <Users2 className="w-4 h-4" /> },
  { href: "/routines", label: "Training Library", icon: <Video className="w-4 h-4" /> },
  { href: "/notifications", label: "Club Broadcast", icon: <Bell className="w-4 h-4" /> },
  { href: "/audit", label: "Audit", icon: <Settings className="w-4 h-4" /> },
];

export default function CommandK({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const router = useRouter();
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search pages..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          {links.map((l) => (
            <CommandItem key={l.href} onSelect={() => { setOpen(false); router.push(l.href); }}>
              <span className="mr-2">{l.icon}</span>
              {l.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
