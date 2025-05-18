import { MeetingIDsAndMessage } from "./meeting.ids.and.message";

export interface MeetingDetails extends MeetingIDsAndMessage {
    startTime: Date;
    endTime: Date;
  }