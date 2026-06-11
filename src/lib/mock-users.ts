import type { User } from "@/types/user";

/**
 * Mock dataset — 45 users with deliberate edge cases:
 * - #u03: very long name + long email      → demos truncation + tooltip
 * - #u07: member of 5 teams                → demos "+N" badge overflow
 * - #u11/#u12: two distinct "John Doe"s    → proves ID-based identity (wireframe flaw)
 * - ~30% photo: null                       → demos initials avatars
 * - Mix of Active/Inactive, Admin/User     → demos filters & status badges
 */
export const MOCK_USERS: User[] = [
  { id: "u01", firstName: "Elena", lastName: "Petrova", photo: "https://i.pravatar.cc/96?u=u01", email: "elena.petrova@acme.io", phone: "+359 88 412 5567", teams: ["Engineering"], role: "Admin", status: "Active", createdAt: "2024-03-12" },
  { id: "u02", firstName: "Marcus", lastName: "Lindqvist", photo: "https://i.pravatar.cc/96?u=u02", email: "marcus.l@acme.io", phone: "+46 70 123 4456", teams: ["Design", "Product"], role: "User", status: "Active", createdAt: "2024-05-02" },
  { id: "u03", firstName: "Aleksandrina-Konstantina", lastName: "Wojciechowska-Brzęczyszczykiewicz", photo: null, email: "aleksandrina.wojciechowska.brzeczyszczykiewicz@very-long-subsidiary-domain.acme-corporation.io", phone: "+48 512 334 991", teams: ["Operations"], role: "User", status: "Active", createdAt: "2023-11-20" },
  { id: "u04", firstName: "Yuki", lastName: "Tanaka", photo: "https://i.pravatar.cc/96?u=u04", email: "yuki.tanaka@acme.io", phone: "+81 90 1234 5678", teams: ["Security"], role: "Admin", status: "Active", createdAt: "2024-01-15" },
  { id: "u05", firstName: "Omar", lastName: "Haddad", photo: null, email: "omar.haddad@acme.io", phone: "+971 50 234 6678", teams: ["Accounts"], role: "User", status: "Inactive", createdAt: "2023-08-09" },
  { id: "u06", firstName: "Sofia", lastName: "Rossi", photo: "https://i.pravatar.cc/96?u=u06", email: "sofia.rossi@acme.io", phone: "+39 333 445 5667", teams: ["Marketing", "Product"], role: "User", status: "Active", createdAt: "2024-06-30" },
  { id: "u07", firstName: "Dimitar", lastName: "Georgiev", photo: "https://i.pravatar.cc/96?u=u07", email: "d.georgiev@acme.io", phone: "+359 87 655 4332", teams: ["Engineering", "Security", "Operations", "Product", "Service"], role: "Admin", status: "Active", createdAt: "2022-12-01" },
  { id: "u08", firstName: "Priya", lastName: "Sharma", photo: null, email: "priya.sharma@acme.io", phone: "+91 98765 43210", teams: ["Service"], role: "User", status: "Active", createdAt: "2024-02-18" },
  { id: "u09", firstName: "Liam", lastName: "O'Connor", photo: "https://i.pravatar.cc/96?u=u09", email: "liam.oconnor@acme.io", phone: "+353 86 123 4567", teams: ["Engineering"], role: "User", status: "Inactive", createdAt: "2023-04-25" },
  { id: "u10", firstName: "Fatima", lastName: "Al-Sayed", photo: "https://i.pravatar.cc/96?u=u10", email: "fatima.alsayed@acme.io", phone: "+20 100 234 5678", teams: ["Design"], role: "User", status: "Active", createdAt: "2024-07-11" },
  { id: "u11", firstName: "John", lastName: "Doe", photo: null, email: "john.doe@acme.io", phone: "+1 555 010 2233", teams: ["Product"], role: "Admin", status: "Active", createdAt: "2023-01-05" },
  { id: "u12", firstName: "John", lastName: "Doe", photo: "https://i.pravatar.cc/96?u=u12", email: "john.doe2@acme.io", phone: "+1 555 010 9988", teams: ["Service", "Accounts"], role: "User", status: "Inactive", createdAt: "2024-09-14" },
  { id: "u13", firstName: "Greta", lastName: "Hoffmann", photo: "https://i.pravatar.cc/96?u=u13", email: "greta.hoffmann@acme.io", phone: "+49 151 2345 6789", teams: ["Operations"], role: "User", status: "Active", createdAt: "2023-10-02" },
  { id: "u14", firstName: "Carlos", lastName: "Mendoza", photo: null, email: "carlos.mendoza@acme.io", phone: "+52 55 1234 5678", teams: ["Engineering", "Product"], role: "User", status: "Active", createdAt: "2024-04-22" },
  { id: "u15", firstName: "Aisha", lastName: "Bello", photo: "https://i.pravatar.cc/96?u=u15", email: "aisha.bello@acme.io", phone: "+234 803 123 4567", teams: ["Marketing"], role: "User", status: "Active", createdAt: "2024-08-01" },
  { id: "u16", firstName: "Viktor", lastName: "Ivanov", photo: "https://i.pravatar.cc/96?u=u16", email: "v.ivanov@acme.io", phone: "+359 89 776 6554", teams: ["Security", "Engineering"], role: "Admin", status: "Active", createdAt: "2022-06-17" },
  { id: "u17", firstName: "Hannah", lastName: "Kim", photo: null, email: "hannah.kim@acme.io", phone: "+82 10 1234 5678", teams: ["Design"], role: "User", status: "Inactive", createdAt: "2023-12-08" },
  { id: "u18", firstName: "Mateo", lastName: "Silva", photo: "https://i.pravatar.cc/96?u=u18", email: "mateo.silva@acme.io", phone: "+55 11 91234 5678", teams: ["Service"], role: "User", status: "Active", createdAt: "2024-10-19" },
  { id: "u19", firstName: "Nadia", lastName: "Kowalska", photo: "https://i.pravatar.cc/96?u=u19", email: "nadia.kowalska@acme.io", phone: "+48 600 123 456", teams: ["Accounts", "Operations"], role: "User", status: "Active", createdAt: "2023-05-30" },
  { id: "u20", firstName: "Tom", lastName: "Becker", photo: null, email: "tom.becker@acme.io", phone: "+49 170 987 6543", teams: ["Engineering"], role: "User", status: "Active", createdAt: "2024-11-03" },
  { id: "u21", firstName: "Ingrid", lastName: "Sørensen", photo: "https://i.pravatar.cc/96?u=u21", email: "ingrid.sorensen@acme.io", phone: "+45 20 12 34 56", teams: ["Product"], role: "Admin", status: "Active", createdAt: "2023-02-14" },
  { id: "u22", firstName: "Khalid", lastName: "Rahman", photo: "https://i.pravatar.cc/96?u=u22", email: "khalid.rahman@acme.io", phone: "+880 1712 345678", teams: ["Service", "Security"], role: "User", status: "Inactive", createdAt: "2023-07-21" },
  { id: "u23", firstName: "Lucia", lastName: "Fernandez", photo: null, email: "lucia.fernandez@acme.io", phone: "+34 612 345 678", teams: ["Marketing", "Design"], role: "User", status: "Active", createdAt: "2024-12-09" },
  { id: "u24", firstName: "Pavel", lastName: "Novak", photo: "https://i.pravatar.cc/96?u=u24", email: "pavel.novak@acme.io", phone: "+420 601 234 567", teams: ["Engineering"], role: "User", status: "Active", createdAt: "2024-03-28" },
  { id: "u25", firstName: "Amara", lastName: "Okafor", photo: "https://i.pravatar.cc/96?u=u25", email: "amara.okafor@acme.io", phone: "+234 805 987 6543", teams: ["Operations"], role: "User", status: "Active", createdAt: "2023-09-16" },
  { id: "u26", firstName: "Sven", lastName: "Andersson", photo: null, email: "sven.andersson@acme.io", phone: "+46 73 456 7890", teams: ["Security"], role: "User", status: "Inactive", createdAt: "2022-10-11" },
  { id: "u27", firstName: "Mei", lastName: "Chen", photo: "https://i.pravatar.cc/96?u=u27", email: "mei.chen@acme.io", phone: "+86 138 0013 8000", teams: ["Product", "Engineering"], role: "Admin", status: "Active", createdAt: "2024-01-07" },
  { id: "u28", firstName: "Ahmed", lastName: "Mansour", photo: "https://i.pravatar.cc/96?u=u28", email: "ahmed.mansour@acme.io", phone: "+20 111 222 3344", teams: ["Accounts"], role: "User", status: "Active", createdAt: "2023-06-04" },
  { id: "u29", firstName: "Zoe", lastName: "Papadopoulos", photo: null, email: "zoe.papadopoulos@acme.io", phone: "+30 697 123 4567", teams: ["Design", "Marketing"], role: "User", status: "Active", createdAt: "2024-05-26" },
  { id: "u30", firstName: "Raj", lastName: "Patel", photo: "https://i.pravatar.cc/96?u=u30", email: "raj.patel@acme.io", phone: "+44 7700 900123", teams: ["Service"], role: "User", status: "Active", createdAt: "2023-03-19" },
  { id: "u31", firstName: "Camille", lastName: "Dubois", photo: "https://i.pravatar.cc/96?u=u31", email: "camille.dubois@acme.io", phone: "+33 6 12 34 56 78", teams: ["Operations", "Accounts"], role: "User", status: "Inactive", createdAt: "2024-02-29" },
  { id: "u32", firstName: "Stefan", lastName: "Dimitrov", photo: null, email: "stefan.dimitrov@acme.io", phone: "+359 88 990 0112", teams: ["Engineering"], role: "User", status: "Active", createdAt: "2024-07-23" },
  { id: "u33", firstName: "Leila", lastName: "Hosseini", photo: "https://i.pravatar.cc/96?u=u33", email: "leila.hosseini@acme.io", phone: "+98 912 345 6789", teams: ["Product"], role: "User", status: "Active", createdAt: "2023-11-12" },
  { id: "u34", firstName: "Erik", lastName: "Johansen", photo: "https://i.pravatar.cc/96?u=u34", email: "erik.johansen@acme.io", phone: "+47 412 34 567", teams: ["Security"], role: "Admin", status: "Active", createdAt: "2022-08-28" },
  { id: "u35", firstName: "Tania", lastName: "Moreau", photo: null, email: "tania.moreau@acme.io", phone: "+32 470 12 34 56", teams: ["Marketing"], role: "User", status: "Active", createdAt: "2024-09-05" },
  { id: "u36", firstName: "Diego", lastName: "Ramirez", photo: "https://i.pravatar.cc/96?u=u36", email: "diego.ramirez@acme.io", phone: "+57 310 123 4567", teams: ["Service", "Operations"], role: "User", status: "Inactive", createdAt: "2023-04-01" },
  { id: "u37", firstName: "Olga", lastName: "Sokolova", photo: "https://i.pravatar.cc/96?u=u37", email: "olga.sokolova@acme.io", phone: "+371 2123 4567", teams: ["Accounts"], role: "User", status: "Active", createdAt: "2024-06-12" },
  { id: "u38", firstName: "Ben", lastName: "Wright", photo: null, email: "ben.wright@acme.io", phone: "+44 7911 123456", teams: ["Engineering", "Design"], role: "User", status: "Active", createdAt: "2023-10-27" },
  { id: "u39", firstName: "Sara", lastName: "Lindgren", photo: "https://i.pravatar.cc/96?u=u39", email: "sara.lindgren@acme.io", phone: "+46 76 543 2109", teams: ["Product"], role: "User", status: "Active", createdAt: "2024-04-08" },
  { id: "u40", firstName: "Hassan", lastName: "Karimi", photo: "https://i.pravatar.cc/96?u=u40", email: "hassan.karimi@acme.io", phone: "+98 935 678 9012", teams: ["Operations"], role: "User", status: "Inactive", createdAt: "2023-01-31" },
  { id: "u41", firstName: "Anna", lastName: "Visser", photo: null, email: "anna.visser@acme.io", phone: "+31 6 1234 5678", teams: ["Design"], role: "User", status: "Active", createdAt: "2024-08-17" },
  { id: "u42", firstName: "George", lastName: "Mitchell", photo: "https://i.pravatar.cc/96?u=u42", email: "george.mitchell@acme.io", phone: "+1 415 555 0188", teams: ["Security", "Engineering"], role: "Admin", status: "Active", createdAt: "2022-05-09" },
  { id: "u43", firstName: "Ivana", lastName: "Horvat", photo: "https://i.pravatar.cc/96?u=u43", email: "ivana.horvat@acme.io", phone: "+385 91 234 5678", teams: ["Marketing"], role: "User", status: "Active", createdAt: "2024-10-30" },
  { id: "u44", firstName: "Noah", lastName: "Berg", photo: null, email: "noah.berg@acme.io", phone: "+47 905 12 345", teams: ["Service"], role: "User", status: "Active", createdAt: "2023-08-22" },
  { id: "u45", firstName: "Maya", lastName: "Stoyanova", photo: "https://i.pravatar.cc/96?u=u45", email: "maya.stoyanova@acme.io", phone: "+359 89 112 2334", teams: ["Product", "Marketing"], role: "User", status: "Active", createdAt: "2024-11-21" },
];

// ---------------------------------------------------------------------------
// Fake API layer — simulates latency so loading skeletons are demonstrable,
// and a small failure hook so the error state can be shown in a demo.
// ---------------------------------------------------------------------------

const LATENCY_MS = 600;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function fetchUsers(opts?: { fail?: boolean }): Promise<User[]> {
  await delay(LATENCY_MS);
  if (opts?.fail) throw new Error("Failed to load users. Please try again.");
  return [...MOCK_USERS];
}
