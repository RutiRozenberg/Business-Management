
import { Admin, AdminDetails } from "../models/admin.model";
import { comparePassword, hashPassword } from "./bcrypt.bl";
import path from 'path';
import dotenv from 'dotenv';
import { createAdmin, getAdmin } from "../services/admin.service";
import { createToken } from "./user.bl";


const envPath = path.join(__dirname, '../config', '.env');
dotenv.config({ path: envPath });


const signup = async (newAdmin: AdminDetails) => {    
    const existingAdmin: Admin | unknown = await getAdmin();
    if ( (existingAdmin as unknown[] ).length > 0) {
        throw new Error('Admin already exists');
    }
    try{
        const hashedPassword = await hashPassword(newAdmin.password);
        const hashedAdminpassword = await hashPassword(newAdmin.adminPassword);
        newAdmin.password = hashedPassword;
        newAdmin.adminPassword = hashedAdminpassword;
        const admin = await createAdmin(newAdmin);
        return admin;
    }
    catch(err){
        throw new Error('Something went wrong... try again');
    }
   
}


const signin = async (email :string , password :string , adminPassword:string):Promise<string | null> => {

    const arrayAdmin: Admin [] | unknown = await getAdmin();
    if(arrayAdmin  && (arrayAdmin as Admin[]).length > 0){
        const admin: Admin = (arrayAdmin as Admin[])[0] ;
        if( admin 
            && admin.email == email
            && await comparePassword(password, admin.password) 
            && await comparePassword(adminPassword , admin.adminPassword)){
    
            return await createToken(admin._id, admin.email , admin.name , true);
        }
    }
    return null;
}


export {signup , signin}
