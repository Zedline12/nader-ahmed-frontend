"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InviteAdminForm } from "@/features/admin/forms/InviteAdminForm";

export function InviteAdminDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Admin
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-primary-foreground">Invite Admin</DialogTitle>
          <DialogDescription>
            Send an invitation to a new administrator via email.
          </DialogDescription>
        </DialogHeader>
        <InviteAdminForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
