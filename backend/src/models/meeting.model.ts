
import mongoose, { Schema, Document, Model } from 'mongoose';

interface Meeting extends Document {
  _id: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  serviceId: string;
  textMessage: string;
}

const meetingSchema: Schema = new Schema({
  userId: String,
  startTime: Date,
  endTime: Date,
  serviceId: String,
  textMessage: String,
});


const meetingModel: Model<Meeting> = mongoose.model<Meeting>('meeting', meetingSchema);

export { meetingModel, Meeting };