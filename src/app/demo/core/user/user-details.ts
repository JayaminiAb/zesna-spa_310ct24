import { RoleDetails } from "../role-details";

export interface UserDetails{
    Id: number;
    Fullname: string;
    Email: string;
    UserRoleDetails: RoleDetails;
    IsActive: boolean;
    Password: string;
    Total: number;
}