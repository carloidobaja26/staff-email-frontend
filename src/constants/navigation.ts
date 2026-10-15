import type { ComponentType } from "react";
import {
  CalendarDays,
  ClipboardCheck,
  LayoutDashboard,
  MapPin,
  Settings,
  Users,
  UserRound,
  Wallet,
  Building2,
  UserPen,
  Handshake,
  UserCog,
} from "lucide-react";

export type NavigationItem = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

export type NavigationGroup = {
  label: string;
  items: NavigationItem[];
};

export const navigation: NavigationGroup[] = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        label: "Users",
        href: "/users",
        icon: Users,
      },
      {
        label: "Emails",
        href: "/emails",
        icon: UserCog,
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        label: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];