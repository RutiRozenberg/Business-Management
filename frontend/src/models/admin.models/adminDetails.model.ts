import { UserDetails } from "../user.models/userDetails";

export interface AdminDetails extends UserDetails {
    adminPassword : string;
}
