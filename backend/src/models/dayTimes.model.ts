
import mongoose, { Schema, Model } from 'mongoose';
import { TimeRange, timeRangeSchema } from './timerange.model';

interface DayTimesDetails{
    date: Date;
    times: TimeRange[];
}

interface DayTimes extends DayTimesDetails {
    _id: string;
}

const dayTimesSchema: Schema = new Schema({
    date: Date,
    times: [timeRangeSchema],
});

const daytimeModel: Model<DayTimes> = mongoose.model<DayTimes>('dayTimes', dayTimesSchema);

export { daytimeModel, DayTimes, DayTimesDetails };