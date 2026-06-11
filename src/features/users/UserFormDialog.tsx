import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  emptyUserFormValues,
  userFormSchema,
  type UserFormInput,
  type UserFormValues,
} from "@/lib/user-schema";
import type { User } from "@/types/user";
import { UserFormFields } from "./UserFormFields";

const EMPTY_INPUT: UserFormInput = { ...emptyUserFormValues, photo: "" };

function toFormInput(user: User): UserFormInput {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    teams: user.teams,
    role: user.role,
    status: user.status,
    photo: user.photo ?? "",
  };
}

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Present = edit mode, absent = add mode. */
  user?: User;
  onSubmit: (values: UserFormValues) => void;
}

export function UserFormDialog({ open, onOpenChange, user, onSubmit }: UserFormDialogProps) {
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const form = useForm<UserFormInput, unknown, UserFormValues>({
    resolver: zodResolver(userFormSchema),
    mode: "onTouched",
    defaultValues: EMPTY_INPUT,
  });

  // Read during render so RHF's formState proxy actually tracks these fields.
  const { isDirty, isSubmitting } = form.formState;

  // This dialog has no Radix DialogTrigger (it is opened from the toolbar or a
  // row menu), so capture the trigger ourselves — at render time, before
  // Radix moves focus into the dialog — to restore focus on close.
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const prevOpenRef = useRef(false);
  if (open && !prevOpenRef.current) {
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
  }
  prevOpenRef.current = open;

  useEffect(() => {
    if (open) form.reset(user ? toFormInput(user) : EMPTY_INPUT);
  }, [open, user, form]);

  // Backdrop click / Esc must not silently drop unsaved edits.
  const handleOpenChange = (next: boolean) => {
    if (!next && isDirty) {
      setConfirmDiscard(true);
      return;
    }
    onOpenChange(next);
  };

  const handleSubmit = form.handleSubmit((values) => {
    onSubmit(values);
    onOpenChange(false);
  });

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          className="max-h-[85vh] overflow-y-auto sm:max-w-lg"
          onCloseAutoFocus={(event) => {
            const trigger = returnFocusRef.current;
            if (trigger?.isConnected) {
              event.preventDefault();
              trigger.focus();
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>
              {user ? `Edit ${user.firstName} ${user.lastName}` : "Add user"}
            </DialogTitle>
            <DialogDescription>
              {user
                ? "Update the user's details and save your changes."
                : "Fill in the new user's details."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <UserFormFields form={form} />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {user ? "Save changes" : "Add user"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmDiscard} onOpenChange={setConfirmDiscard}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard changes?</AlertDialogTitle>
            <AlertDialogDescription>
              Your unsaved edits will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep editing</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setConfirmDiscard(false);
                onOpenChange(false);
              }}
            >
              Discard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
