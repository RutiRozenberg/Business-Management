
import { Schema } from 'mongoose';

interface TimeRangeDetails{
    start: Date;
    end: Date;
}

interface TimeRange extends TimeRangeDetails {
    _id: string;
}

const timeRangeSchema: Schema = new Schema({
    start: Date,
    end: Date,
});

export { TimeRange , timeRangeSchema , TimeRangeDetails };