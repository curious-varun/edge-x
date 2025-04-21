export const PROTECTED_ROUTES: string[] = ["/my-courses"];

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
} from "lucide-react";

export const userData = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

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
        icon: Home,
        url: "/admin",
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
        url: "/admin/finance",
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

