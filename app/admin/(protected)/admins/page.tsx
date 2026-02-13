import * as React from "react";
import { MoreHorizontal, Trash } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchWithToken } from "@/lib/fetcher";
import { AdminUser, RoleEnum } from "@/features/admin/users/types/user";
import { InviteAdminDialog } from "@/features/admin/components/InviteAdminDialog";

export default async function AdminsPage() {
  const response = await fetchWithToken("/users?role=2");

  if (!response.ok) {
    return <div>Error loading admins</div>;
  }

  const data = await response.json();
  const admins: AdminUser[] = data.data || [];

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold text-primary-foreground">Admins</h2>
          <p className="text-secondary-foreground">
            Manage admin access and permissions.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <InviteAdminDialog />
        </div>
      </div>

      <div className="rounded-md border ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={admin.avatarUrl}
                      alt={`${admin.firstName} ${admin.lastName}`}
                    />
                    <AvatarFallback>{admin.firstName.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium text-secondary-foreground hover:text-primary-foreground">
                  {admin.firstName} {admin.lastName}
                </TableCell>
                <TableCell className="text-secondary-foreground hover:text-primary-foreground">
                  {admin.email}
                </TableCell>
                <TableCell className="text-secondary-foreground hover:text-primary-foreground">
                  {RoleEnum[admin.role.id]}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      admin.status.id === 1
                        ? "bg-emerald-100 text-emerald-700"
                        : admin.status.id === 0
                          ? "bg-amber-100 text-amber-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {admin.status.id === 0 ? "Invitation Pending" : "Active"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white" align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600 focus:text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Remove Access
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
