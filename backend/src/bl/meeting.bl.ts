
import { Meeting, MeetingDetails } from "../models/meeting.model"
import * as meetingService from "../services/meeting.service"
import { catchTime, isValidTimes } from "./time.bl"
import { getServiceById } from "./service.bl";

const getAllMeetings = async () => {
    try {
        const meetings: Meeting[] = (await meetingService.getAllMeeting()) as unknown[] as Meeting[];
        if (meetings.length > 0) {
            return meetings;
        }
        else {
            throw new Error("Meetings does not found");
        }
    }
    catch {
        throw new Error("Faild");
    }
}

const getMeetingById = async (id: string) => {
    try {
        const meeting: Meeting = (await meetingService.getMeetingById(id)) as unknown as Meeting;
        if (meeting == null) {
            throw new Error("Not found");
        }
        return meeting;
    }
    catch {
        throw new Error("Faild");
    }
}

const getMeetingsByUserId = async (userId: string) => {
    try {
        const allMeetings: Meeting[] = await getAllMeetings();
        const meetingByUserId: Meeting[] = allMeetings.filter(
            meeting => meeting.userId.toString() === userId.toString()
        );
        if(meetingByUserId.length > 0){
            return meetingByUserId;
        }
        throw new Error("Not Faound");  
    } catch (error) {
        throw new Error("Faild");
    }
}


const createMeeting = async (newMeeting: MeetingDetails) => {
    try {
        if (await isValidMeeting(newMeeting)) {            
            await catchTime(newMeeting.startTime, newMeeting.endTime);
            return await meetingService.createMeeting(newMeeting) as Meeting;
        }
        throw new Error("Invalid parameters");
    }
    catch (err) {
        throw new Error("Meeting creation failed");
    }
}

const updateMeeting = async (id: string, meeting: Meeting) => {
    if (id != meeting._id) {
        throw new Error("Invalid parameters");
    }
    try {
        const meetingToUpdate: Meeting | null = (await meetingService.getMeetingById(id));
        if (meetingToUpdate) {
            if (meeting.textMessage) {
                meetingToUpdate.textMessage = meeting.textMessage;
            }
            await meetingService.updateMeeting(id, meetingToUpdate);
        }
    }
    catch (err) {
        throw new Error("The update failed");
    }

}


const deleteMeeting = async (id: string) => {
    try {
        await meetingService.deleteMeeting(id);
    }
    catch {
        throw new Error("The deletion failed");
    }
}

const isValidMeeting = async (meeting: MeetingDetails) => {
    if (!meeting.startTime ||
        !meeting.endTime ||
        !meeting.serviceId ||
        !isValidTimes(meeting.startTime, meeting.endTime) ||
        !(await getServiceById(meeting.serviceId))
    ) {        
        return false;
    }    
    return true;
}


export { 
    getMeetingById, 
    getAllMeetings, 
    createMeeting, 
    updateMeeting, 
    deleteMeeting,
    getMeetingsByUserId
} 
