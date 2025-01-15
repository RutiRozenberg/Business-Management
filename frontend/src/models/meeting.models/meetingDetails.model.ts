import { MeetingIDsAndMessage } from "./meeting.IDs.and.message";

export interface MeetingDetails extends MeetingIDsAndMessage {
    startTime: Date;
    endTime: Date;
  }