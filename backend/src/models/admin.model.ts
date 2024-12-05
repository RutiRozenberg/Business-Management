
import mongoose, { Schema , Model } from 'mongoose';
import { UserDetails } from './user.model';

interface AdminDetails extends UserDetails {
    adminPassword : string;
}

interface Admin extends AdminDetails{
    _id: string;
}

const adminSchema: Schema = new Schema({
    adminPassword : String,
    name: String,
    email: String,
    password: String,
});

const adminModel: Model<Admin> = mongoose.model<Admin>('admin', adminSchema);

export { adminModel , Admin, AdminDetails };