import { z } from "zod";
import { ALL_TEAMS, type Team } from "@/types/user";

/**
 * Validation schema for Add/Edit User form.
 *
 * Design decisions (worth citing in README):
 * - Every rule produces a human-readable message rendered as inline text,
 *   fixing the wireframe's color-only error indication (WCAG 1.4.1).
 * - trim() before validation so "   " doesn't pass required checks.
 * - Phone is intentionally permissive (international admin tool) but
 *   rejects obvious garbage.
 * - At least one team required — the wireframe allowed an undefined state.
 */
export const userFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(50, "First name must be 50 characters or fewer"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name must be 50 characters or fewer"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address, e.g. name@company.com"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(
      /^\+?[0-9\s().-]{7,20}$/,
      "Enter a valid phone number, e.g. +359 88 123 4567"
    ),
  teams: z
    .array(z.enum(ALL_TEAMS as [Team, ...Team[]]))
    .min(1, "Assign the user to at least one team"),
  role: z.enum(["Admin", "User"], { error: "Select a role" }),
  status: z.enum(["Active", "Inactive"], { error: "Select a status" }),
  photo: z.string().url("Photo must be a valid URL").nullable().or(z.literal("").transform(() => null)),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
/** Pre-validation shape (photo may be "" before the transform maps it to null). */
export type UserFormInput = z.input<typeof userFormSchema>;

export const emptyUserFormValues: UserFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  teams: [],
  role: "User",
  status: "Active",
  photo: null,
};
