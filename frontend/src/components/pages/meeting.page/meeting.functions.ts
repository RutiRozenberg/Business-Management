import { Time } from "../../../models/date.and.time.models/time.model";
import { DayTimes } from "../../../models/daytimes.model";

export const getTimesArr = (daytimes:DayTimes) => {
    const timesArr: Time[] = [];
  
    daytimes.times.forEach(daytime => {
      let { end, start } = daytime;
      end = new Date(end);
      start = new Date(start);
      
      while(start < end){
        timesArr.push(getTimeFromDate(start));
        start.setMinutes(start.getMinutes() + 5);
      }
    });
    return timesArr;
  }
  
export const getTimeFromDate = (date:Date):Time => {
    return {hour: date.getHours() , minute: date.getMinutes()};
}
  
export const getTimefromStringTime = (timeString:string):Time => {
    const [hour, minute] = timeString.split(':').map(Number);
    return {hour,minute};
};
  
export const getDuration = (start:Date, end:Date) => {
  
    const startDate = new Date(start);
    const endDate = new Date(end);
  
    const startHour = startDate.getHours();
    const startMinute = startDate.getMinutes();
  
    const endHour = endDate.getHours();
    const endMinute = endDate.getMinutes();
  
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
  
    const durationInMinutes = endTotalMinutes - startTotalMinutes;
  
    return durationInMinutes;
  
}


export const mergeDateAndTime = (date: Date, timeString: string): Date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const {hour, minute} = getTimefromStringTime(timeString);
    return new Date(year, month, day, hour, minute);
};


export const getEndTime = (startDate: Date, durationInMinutes: number): Date => {
  const endDate = new Date(startDate);
  endDate.setMinutes(endDate.getMinutes() + durationInMinutes);
  return endDate;
}
  

