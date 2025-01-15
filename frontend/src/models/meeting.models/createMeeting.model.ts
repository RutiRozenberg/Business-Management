import { MeetingIDsAndMessage } from "./meeting.IDs.and.message";

export interface CreateMeeting extends MeetingIDsAndMessage {
    startTime: string;
    endTime: string;
}