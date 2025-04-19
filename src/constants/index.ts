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
