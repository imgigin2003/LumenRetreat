import {
  LayoutDashboard,
  CalendarDays,
  Home,
  Users,
  Settings2,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/bookings', label: 'Bookings', icon: CalendarDays },
  { to: '/cabins', label: 'Cabins', icon: Home },
  { to: '/guests', label: 'Guests', icon: Users },
  { to: '/settings', label: 'Settings', icon: Settings2 },
];
