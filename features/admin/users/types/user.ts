export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  role: Role;
  status: Status;
}
export enum RoleEnum {
  USER = 1,
  ADMIN = 2,
  SUPER_ADMIN = 3,
}
export enum StatusEnum {
  ACTIVE = 1,
  INACTIVE = 0,
}
export interface Status {
 
    id: number;

  name?: string;
}
export interface Role{
    id: number;
    name?: string;
}