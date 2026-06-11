export type Role = "Admin" | "User";
export type Status = "Active" | "Inactive";

export type Team =
  | "Engineering"
  | "Design"
  | "Product"
  | "Accounts"
  | "Service"
  | "Security"
  | "Operations"
  | "Marketing";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  /** URL or null — null renders an initials avatar */
  photo: string | null;
  email: string;
  phone: string;
  teams: Team[];
  role: Role;
  status: Status;
  createdAt: string; // ISO date, useful for default sort
}

export const ALL_TEAMS: Team[] = [
  "Engineering",
  "Design",
  "Product",
  "Accounts",
  "Service",
  "Security",
  "Operations",
  "Marketing",
];
