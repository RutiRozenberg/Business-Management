import { UserDetails } from "../user.models/user.details";

export interface AdminDetails extends UserDetails {
    adminPassword : string;
}
