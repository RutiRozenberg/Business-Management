
import { adminModel, Admin, AdminDetails } from '../models/admin.model'; 


const createAdmin = async (adminData: AdminDetails): Promise<Admin> => {
  try {
    const newAdmin = new adminModel(adminData);
    const savedAdmin = await newAdmin.save();
    return savedAdmin;
  } catch (error) {
    throw new Error('Failed to save admin to the database');
  }
};


const getAdmin = async () :Promise<Admin | unknown> => {
    const admin = await adminModel.find().exec();
    return admin;
}

const updateAdmin = async (id: string , updatedData:Admin ):Promise<void> =>{
    try {
        await adminModel.findByIdAndUpdate(id, updatedData);
    } catch (error) {
        throw new Error('Failed to update admin in the database');
    }
}

export { createAdmin , getAdmin , updateAdmin}
