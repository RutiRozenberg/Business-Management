
import mongoose, { Schema, Document, Model } from 'mongoose';
import { TimeRange, timeRangeSchema } from './timeRange.model';

interface DayTimes extends Document {
    _id: string;
    date: Date;
    times: TimeRange[];
}

const dayTimesSchema: Schema = new Schema({
    date: Date,
    times: [timeRangeSchema],
});

const daytimeModel: Model<DayTimes> = mongoose.model<DayTimes>('dayTimes', dayTimesSchema);

export { daytimeModel, DayTimes };