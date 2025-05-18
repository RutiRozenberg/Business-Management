import { UserJwt } from "../user.models/user.jwt.model";

export interface AdminJwt extends UserJwt{
    adminPassword: string;
    isAdmin: boolean;
}