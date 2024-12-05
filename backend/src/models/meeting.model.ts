
import mongoose, { Schema, Model } from 'mongoose';

interface MeetingDetails{
  userId: string;
  startTime: Date;
  endTime: Date;
  serviceId: string;
  textMessage: string;
}

interface Meeting extends MeetingDetails {
  _id: string;
}

const meetingSchema: Schema = new Schema({
  userId: String,
  startTime: Date,
  endTime: Date,
  serviceId: String,
  textMessage: String,
});


const meetingModel: Model<Meeting> = mongoose.model<Meeting>('meeting', meetingSchema);

export { meetingModel, Meeting, MeetingDetails };