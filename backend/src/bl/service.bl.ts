
import  { Service, ServiceDetails }  from "../models/services.model"
import * as serviceService from "../services/service.service"


const getAllServices = async ()=>{
    try{
        const services :Service[] = (await serviceService.getAllServices()) as unknown [] as Service [];
        if(services.length > 0){
            return services ;
        }
        else{
            throw new Error("Services does not found");
        }
    }
    catch{
        throw new Error("Faild");     
    }
}

const getServiceById = async (id : string) =>{
    try{
        const service:Service = (await serviceService.getServiceById(id) ) as unknown as Service;
        if(service == null ){
            throw new Error("Not found");
        }
        return service;
    }
    catch{
        throw new Error("Faild");
        
    }
}

const createService = async (newService: ServiceDetails)=>{
    if( newService.price == null 
        || newService.name == null 
        || newService.duration ==null 
        || newService.description == null)
        {
            throw new Error("Invalid service details");
            
        }
    try{
        return await serviceService.createService(newService) as Service;
    }
    catch(err){
        throw new Error("Service creation failed");
    }
    
}

const updateService = async (id :string , service: Service)=> {
    if(id != service._id ){
        throw new Error("Invalid parameters");
    }
    const serviceToUpdate = ( await serviceService.getServiceById(id))  as unknown as Service;
    if(service.name){
        serviceToUpdate.name =service.name;
    }
    if(service.price){
        serviceToUpdate.price = service.price;
    }
    if(service.duration){
        serviceToUpdate.duration= service.duration;
    } 
    if(service.description){
        serviceToUpdate.description = service.description;
    }

    try{
        await serviceService.updateService(id,serviceToUpdate);

    }
    catch(err){
        throw new Error("The update failed");
    }
}


const deleteService = async (id: string)=>{
    const service:Service =  (await serviceService.getServiceById(id)) as unknown as Service;
    if(service._id != id){
        throw new Error("No permissions");
    }
    try{
        await serviceService.deleteService(id);
    }
    catch{
        throw new Error("The deletion failed");
    }
}


export { getServiceById , getAllServices , createService , updateService , deleteService } 
