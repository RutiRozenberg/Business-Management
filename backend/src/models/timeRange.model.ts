
import { Schema } from 'mongoose';

interface TimeRange {
    start: Date;
    end: Date;
    _id: string;
}

const timeRangeSchema: Schema = new Schema({
    start: Date,
    end: Date,
});

export { TimeRange , timeRangeSchema };