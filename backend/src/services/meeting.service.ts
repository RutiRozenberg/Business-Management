
import { Meeting, MeetingDetails, meetingModel } from "../models/meeting.model"


const createMeeting = async (meetingData: MeetingDetails)=>{
    try {
        const newMeeting  = new meetingModel(meetingData);
        const savedMeeting = await newMeeting.save();
        return savedMeeting;
    }catch (error) {
        throw new Error('Failed to save meeting to the database');
    }
}


const getAllMeeting = async () => {
    try{
        const meeting = await meetingModel.find().exec();
        return meeting;
    }
    catch{
        throw new Error("Failed to load meeting from the database");
        
    }
    
}


const getMeetingById = async (id:string)=>{
    try{
        const meeting = await meetingModel.findById(id);
        return meeting
    }
    catch{
        throw new Error("Not found");
        
    }
    
}


const updateMeeting = async ( id :string , updatedData : Meeting ) => {
    try {
        const updatedObject = await meetingModel.findByIdAndUpdate(id , updatedData);
        return updatedObject;
    } catch (error) {
        throw new Error('Failed to update meeting in the database');
    }
}


const deleteMeeting = async (id:unknown) =>{
    try{        
        await meetingModel.findByIdAndDelete(id);
    }
    catch{
        throw new Error("The deletion failed");
    }
}


export { createMeeting  , getAllMeeting , getMeetingById,  updateMeeting ,deleteMeeting}