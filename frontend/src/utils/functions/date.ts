import { format, toZonedTime } from "date-fns-tz";

const getFormatDate = (date: Date)=>{
    const timeZone = 'Asia/Jerusalem';
    const zonedDate = toZonedTime(date, timeZone);
  
    const isoString = format(zonedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", { timeZone });
    return isoString;
}



export {getFormatDate}