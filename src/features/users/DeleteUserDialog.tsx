import { useRef } from "react";

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
import type { User } from "@/types/user";

interface DeleteUserDialogProps {
  /** The user pending deletion; null keeps the dialog closed. */
  user: User | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: (user: User) => void;
}

export function DeleteUserDialog({ user, onOpenChange, onConfirm }: DeleteUserDialogProps) {
  // Keep the last user around so the text doesn't blank out mid close-animation.
  const lastUserRef = useRef<User | null>(null);
  if (user) lastUserRef.current = user;
  const shown = user ?? lastUserRef.current;

  return (
    <AlertDialog open={user !== null} onOpenChange={onOpenChange}>
      <AlertDialogContent
        onCloseAutoFocus={(event) => {
          // On cancel/Esc, return focus to the row's "⋯" button. The table and
          // card list each render one, so pick the visible one. After a
          // confirmed delete the row is gone, so fall through to the default.
          const trigger = shown
            ? Array.from(
                document.querySelectorAll<HTMLElement>(
                  `[data-actions-for="${shown.id}"]`
                )
              ).find((el) => el.offsetParent !== null)
            : undefined;
          if (trigger) {
            event.preventDefault();
            trigger.focus();
          }
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete {shown?.firstName} {shown?.lastName}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove {shown?.email} and cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => user && onConfirm(user)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
