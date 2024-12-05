import { TimeRange } from "./timeRange.model";

export interface DayTimes{
    _id: string;
    date: Date;
    times: TimeRange[];
}