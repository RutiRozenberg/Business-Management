
import { Business, BusinessDetails, businesstModel } from "../models/business.model"


const createBusiness = async (BusinessData : BusinessDetails)=>{
    try {
        const newBusiness = new businesstModel(BusinessData);
        const savedBusiness = await newBusiness.save();
        return savedBusiness;   
    }catch (error) {
        throw new Error('Failed to save business to the database');
    }
}


const getBusiness = async () => {
    const business = await businesstModel.find().exec();
    return business[0];
}


const updateBusiness = async ( id:string , updatedData : Business ) => {
    try {
        await businesstModel.findByIdAndUpdate(id , updatedData);
        return await getBusiness();
    } 
    catch {
        throw new Error('Failed to update business in the database');
    }
}


const deleteBusiness = async (id:string) =>{
    try{        
        await businesstModel.findByIdAndDelete(id);
    }
    catch{
        throw new Error("The deletion failed");
    }
}


export { createBusiness  , getBusiness , updateBusiness ,deleteBusiness}