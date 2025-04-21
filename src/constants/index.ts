export const PUBLIC_ROUTES: string[] = [
  "/",
  "client",
];


export const AUTHENTICATED_ROUTES: string[] = [
  "/protected"
];

export const ADMIN_ROUTES: string[] = [
];

export enum ROLE {
  USER = "user",
  ADMIN = "admin"
}

import {
  type LucideIcon,
  LayoutPanelTopIcon,
  CircleCheckBig,
  UserCheck,
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
    sectionName: "High Command",
    items: [
      {
        itemName: "Infrastructure",
        isCollapsible: true,
        icon: LayoutPanelTopIcon,
        subItems: [
          { subItemName: "text", url: "/test" },
          { subItemName: "Labs", url: "/infrastructure/labs" },
          { subItemName: "Exam Pattern", url: "/infrastructure/exams-pattern" },
        ],
      },
      {
        itemName: "Roles & Permissions",
        isCollapsible: false,
        icon: UserCheck,
        url: "/roles-permissions",
      },
      {
        itemName: "Approvals",
        isCollapsible: false,
        icon: CircleCheckBig,
        url: "/approvals",
      },
    ],
  },
];
