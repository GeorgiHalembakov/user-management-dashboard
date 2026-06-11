import { Controller, type UseFormReturn } from "react-hook-form";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UserFormInput, UserFormValues } from "@/lib/user-schema";
import { TeamMultiSelect } from "./TeamMultiSelect";

type UserForm = UseFormReturn<UserFormInput, unknown, UserFormValues>;

function fieldAria(id: string, error: string | undefined) {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  };
}

// Always rendered (empty when valid) so the reserved line keeps the dialog
// from shifting when a message appears.
function FieldError({ id, error }: { id: string; error: string | undefined }) {
  return (
    <p id={`${id}-error`} className="min-h-5 text-sm text-destructive">
      {error}
    </p>
  );
}

export function UserFormFields({ form }: { form: UserForm }) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            {...fieldAria("firstName", errors.firstName?.message)}
            {...register("firstName")}
          />
          <FieldError id="firstName" error={errors.firstName?.message} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            {...fieldAria("lastName", errors.lastName?.message)}
            {...register("lastName")}
          />
          <FieldError id="lastName" error={errors.lastName?.message} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...fieldAria("email", errors.email?.message)}
          {...register("email")}
        />
        <FieldError id="email" error={errors.email?.message} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          {...fieldAria("phone", errors.phone?.message)}
          {...register("phone")}
        />
        <FieldError id="phone" error={errors.phone?.message} />
      </div>

      <Controller
        control={control}
        name="teams"
        render={({ field }) => (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="teams">Teams</Label>
            <TeamMultiSelect
              id="teams"
              className="w-full"
              selected={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              triggerLabel={
                field.value.length > 0
                  ? `${field.value.length} selected`
                  : "Select teams"
              }
              {...fieldAria("teams", errors.teams?.message)}
            />
            {field.value.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {field.value.map((team) => (
                  <Badge key={team} variant="secondary" className="gap-1 pr-1">
                    {team}
                    <button
                      type="button"
                      aria-label={`Remove ${team}`}
                      className="rounded-full outline-none hover:bg-foreground/10 focus-visible:ring-2 focus-visible:ring-ring"
                      onClick={() =>
                        field.onChange(field.value.filter((t) => t !== team))
                      }
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            <FieldError id="teams" error={errors.teams?.message} />
          </div>
        )}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="role">Role</Label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="role"
                  className="w-full"
                  onBlur={field.onBlur}
                  {...fieldAria("role", errors.role?.message)}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                </SelectContent>
              </Select>
              <FieldError id="role" error={errors.role?.message} />
            </div>
          )}
        />
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="status">Status</Label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="status"
                  className="w-full"
                  onBlur={field.onBlur}
                  {...fieldAria("status", errors.status?.message)}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FieldError id="status" error={errors.status?.message} />
            </div>
          )}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="photo">Photo URL</Label>
        <Input
          id="photo"
          type="url"
          placeholder="https://…"
          aria-invalid={errors.photo ? true : undefined}
          aria-describedby={errors.photo ? "photo-error photo-help" : "photo-help"}
          {...register("photo")}
        />
        <p id="photo-help" className="text-sm text-muted-foreground">
          Leave empty to use initials.
        </p>
        <FieldError id="photo" error={errors.photo?.message} />
      </div>
    </div>
  );
}
