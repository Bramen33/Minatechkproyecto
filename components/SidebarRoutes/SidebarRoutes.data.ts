import {
  BarChart4,
  Building2,
  PanelsTopLeft,
  Settings,
  ShieldCheck,
  CircleHelpIcon,
  UsersRound,
} from "lucide-react";

export const dataGeneralSidebar = [
  {
    icon: PanelsTopLeft,
    label: "Dashboard",
    href: "/",
  },
  // {
  //   icon: Building2,
  //   label: "Movimientos",
  //   href: "/Movimientos",
  // },
  // {
  //   icon: UsersRound,
  //   label: "Referidos",
  //   href: "/ReferralSystem",
  // },
];

export const dataToolsSidebar = [
  {
    icon: CircleHelpIcon,
    label: "Faqs",
    href: "/faqs",
  },
  // {
  //   icon: BarChart4,
  //   label: "Analytics",
  //   href: "/analytics",
  // },
];

export const dataSupportSidebar = [
  {
    icon: Settings,
    label: "Setting",
    href: "/setting",
  },
  {
    icon: ShieldCheck,
    label: "Security",
    href: "/security",
  },
];

export const dataGeneralSidebarAdmin = [
  {
    icon: Settings,
    label: "Usuarios",
    href: "/",
  },
  // {
  //   icon: ShieldCheck,
  //   label: "Balance",
  //   href: "/security",
  // },
];