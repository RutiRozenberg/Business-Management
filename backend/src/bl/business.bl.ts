
import  { Business, BusinessDetails }  from "../models/business.model"
import * as businessService from "../services/business.service"


const getBusiness =async ()=>{
    try{
        const business:Business = (await businessService.getBusiness()) as unknown as Business;
        if(business){
            return business ;
        }
        else{
            throw new Error("Business does not exist");
        }
    }
    catch{
        throw new Error("Faild");     
    }
}

const createBusiness = async (newBusiness: BusinessDetails)=>{
    try{
        if( !newBusiness.name || 
            !newBusiness.address || 
            !newBusiness.email || 
            !newBusiness.phone 
        ) {
            throw new Error("Invalid business details");       
        }
        const business:Business | null = await businessService.getBusiness();
        if(business){
            throw new Error("Business elready exist");
        }
        return await businessService.createBusiness(newBusiness) as Business;
    }
    catch(err){
        throw new Error("Business creation failed");
    }
}


const updateBusiness = async (id :string , business: Business)=> {
    if(id != business._id ){
        throw new Error("Invalid parameters");
    }
    try{
        const businessToUpdate = ( await getBusiness())  as unknown as Business;
        if(business.name){
            businessToUpdate.name =business.name;
        }
        if(business.address){
            businessToUpdate.address = business.address;
        }
        if(business.phone){
            businessToUpdate.phone= business.phone;
        } 
    
        try{
            return await businessService.updateBusiness(id , businessToUpdate);
        }
        catch(err){
            throw new Error("The update failed");
        }
    }
    catch{
        throw new Error("Not Found"); 
    }
    
}


const deleteBusiness = async (id: string)=>{
    try{
        const business:Business =  (await getBusiness()) as unknown as Business;
        if(business._id != id){
            throw new Error("No permissions");
        }
        await businessService.deleteBusiness(id);
    }
    catch{
        throw new Error("The deletion failed");
    }
}


export { getBusiness , createBusiness , updateBusiness , deleteBusiness } 
