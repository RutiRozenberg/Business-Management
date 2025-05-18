import { MeetingIDsAndMessage } from "./meeting.ids.and.message";

export interface CreateMeeting extends MeetingIDsAndMessage {
    startTime: string;
    endTime: string;
}