export const PROTECTED_ROUTES: string[] = ["/my-courses"];
export const ADMIN_EMAILS = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',') : [
  "devvarunbhardwaj@gmail.com",
  "vaurn.ai@gmail.com"
];

export enum ROLE { USER = "user", ADMIN = "admin" }

import {
  type LucideIcon,
  Home,
  User,
  MessageCircle,
  Coins,
  Inbox,
  Airplay,
  Currency,
  LayoutDashboard,
} from "lucide-react";

export interface SectionType {
  sectionName: string;
  items: ItemType[];
}

export interface ItemType {
  itemName: string;
  url?: string;
  icon: LucideIcon;
  isCollapsible: boolean;
  subItems?: SubItemType[];
}

export interface SubItemType {
  subItemName: string;
  url: string;
}

export const sidebarNavigationSection: SectionType[] = [
  {
    sectionName: "Home",
    items: [
      {
        itemName: "dashboard",
        isCollapsible: false,
        icon: LayoutDashboard,
        url: "/admin",
      },
      {
        itemName: "home",
        isCollapsible: false,
        icon: Home,
        url: "/",
      },
    ],
  },
  {
    sectionName: "Management",
    items: [
      {
        itemName: "courses",
        isCollapsible: false,
        icon: Airplay,
        url: "/admin/courses",
      },


      {
        itemName: "users",
        isCollapsible: false,
        icon: User,
        url: "/admin/user",
      },
    ],
  },
  {
    sectionName: "Finance",
    items: [
      {
        itemName: "0verview",
        isCollapsible: false,
        icon: Currency,
        url: "/admin/making",
      },
      {
        itemName: "Transactions",
        isCollapsible: false,
        icon: Coins,
        url: "admin/finance/transactions",
      },
    ],
  },
  {
    sectionName: "Communication",
    items: [
      {
        itemName: "messages",
        isCollapsible: false,
        icon: MessageCircle,
        url: "/admin/messages",
      },
      {
        itemName: "requests",
        isCollapsible: false,
        icon: Inbox,
        url: "admin/messages/request",
      },
    ],
  },
];
