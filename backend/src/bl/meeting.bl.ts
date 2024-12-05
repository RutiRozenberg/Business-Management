
import { Meeting } from "../models/meeting.model"
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


const createMeeting = async (newMeeting: Meeting) => {
    try {
        if (await isValidMeeting(newMeeting)) {            
            await catchTime(newMeeting.startTime, newMeeting.endTime);
            const meet = {
                userId: newMeeting.userId, 
                serviceId:newMeeting.serviceId,
                startTime: newMeeting.startTime,
                endTime: newMeeting.endTime,
                textMessage: newMeeting.textMessage
             }
            return await meetingService.createMeeting(meet) as Meeting;
        }
        throw new Error("Invalid parameters");
    }
    catch (err) {
        throw new Error("Meeting creation failed");
    }
}

const updateMeeting = async (id: string, meeting: Meeting) => {
    if (id != meeting.id) {
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

const isValidMeeting = async (meeting: Meeting) => {
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


export { getMeetingById, getAllMeetings, createMeeting, updateMeeting, deleteMeeting } 
