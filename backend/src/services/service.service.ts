
import { Service, ServiceDetails, servicetModel } from "../models/services.model"


const createService = async (serviceData : ServiceDetails)=>{
    try {
        const newService  = new servicetModel(serviceData);
        const savedService = await newService.save();
        return savedService;
    }catch (error) {
        throw new Error('Failed to save service to the database');
    }
}


const getAllServices = async () => {
    try{
        const services = await servicetModel.find().exec();
        return services;
    }
    catch{
        throw new Error("Failed to load service from the database");
        
    }
    
}


const getServiceById = async (id:string)=>{
    try{
        const service = await servicetModel.findById(id);
        return service
    }
    catch{
        throw new Error("Not found");
        
    }
    
}


const updateService = async ( id :string , updatedData : Service ) => {
    try {
        const updatedObject = await servicetModel.findByIdAndUpdate(id , updatedData);
        return updatedObject;
    } catch (error) {
        throw new Error('Failed to update service in the database');
    }
}


const deleteService = async (id:unknown) =>{
    try{        
        await servicetModel.findByIdAndDelete(id);
    }
    catch{
        throw new Error("The deletion failed");
    }
}


export { createService  , getAllServices , getServiceById,  updateService ,deleteService}