import { UserJwt } from "../user.models/userJWT.model";

export interface AdminJwt extends UserJwt{
    adminPassword: string;
    isAdmin: boolean;
}