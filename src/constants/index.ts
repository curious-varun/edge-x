export const PUBLIC_ROUTES: string[] = [
  "/",
  "/courses",
  "/login",
  "/register",
  "/about-us",
  "/privacy-policy",
  "/terms-and-conditions",
  "/contact",
  "/faq"
];

export const AUTHENTICATED_ROUTES: string[] = [
  "/profile",
  "/dashboard",
  "/my-courses",
  "/settings",
  "/notifications"
];

export const ADMIN_ROUTES: string[] = [
  "/admin",
  "/admin/users",
  "/admin/settings",
  "/admin/courses",
  "/admin/analytics"
];

export enum ROLE {
  USER,
  ADMIN
}
