import { TimeRange } from "../models/timerange.model"
import * as dayTimeBl from "./daytimes.bl"
import { DayTimes } from "../models/daytimes.model";
import log4js from 'log4js';
import { isAfter, isBefore, isEqual } from 'date-fns';


const logger = log4js.getLogger();

const isSameDate = (dateData1: Date , dateData2: Date) => {
    const date1:Date = new Date(dateData1);
    const date2:Date = new Date(dateData2);
    return date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getUTCMonth() === date2.getUTCMonth() &&
    date1.getUTCDate() === date2.getUTCDate() ;
}

const isSameTime = (dateData1:Date , dateData2:Date ) =>{
    const date1:Date = new Date(dateData1);
    const date2:Date = new Date(dateData2);
    return date1.getHours() === date2.getHours() && date1.getMinutes() === date2.getMinutes();
}

const isBeforeTime = (dateData1:Date , dateData2:Date) => {
    const date1:Date = new Date(dateData1);
    const date2:Date = new Date(dateData2);
    if(date1.getUTCHours() < date2.getUTCHours()) {
        return true;
    }
    if(date1.getUTCHours() === date2.getUTCHours()){
        if(date1.getUTCMinutes() < date2.getUTCMinutes()){
            return true;
        }
    }

    return false;  
}


const isValidTimes = (start: Date, end: Date) => {
    const currentDate: Date = new Date();
    const startDate: Date = new Date(start);
    const endDate: Date = new Date(end); 

    if (!startDate || !endDate) {        
        return false;
    }
    if(!isSameDate(startDate, endDate) || isAfter(startDate, endDate)) {
        return false;
    }
    if(isSameDate(startDate, currentDate) && isBeforeTime(startDate, currentDate)) {
        return false;
    }
    return true;
}

const existTime = async (dayTime: DayTimes, newTime: TimeRange) => {

    let existTime = false;

    dayTime.times.forEach((timerange) => {

        if(isEqual(newTime.start, timerange.start)){
            if(isEqual(newTime.end, timerange.end) || isBefore(newTime.end, timerange.end)){
                existTime = true;        
            }
        } else {
            if (isEqual(newTime.end, timerange.end)){
                if(isAfter(newTime.start, timerange.start)){
                    existTime = true;
                }
            } else {
                if(isAfter(newTime.start, timerange.start) && isBefore(newTime.end, timerange.end)){
                    existTime = true;
                }
            }
        } 
    })

    return existTime;
}

const existdayTime = async (id:string) => {
    try {
        const existingDaytime = await dayTimeBl.getDayTimeById(id);
        if (!existingDaytime) {
            throw new Error('Daytime not found');
        }
        return existingDaytime;
    } catch (error) {
        logger.error('Failed to check if a Daytime object exists' , error);
        throw error;
    }
}

const isValidTimeRange = async (timeRange: TimeRange , daytime: DayTimes) => {
    try {
        const { start, end } = timeRange;
        
        if (!isValidTimes(start, end) || !daytime) {
            throw new Error("Invalid parameters");
        }
        if (!isSameDate(daytime.date , start)) {
            throw new Error("Not the same date");
        }
    } catch(error){
        logger.error(`Invalid time range details: ${timeRange} when trying to create a time range`, error);
        throw new Error("Invalid time details");
    }
}

const pushAndUpdatetDaytime = async (newTime:TimeRange , daytime: DayTimes ) => {
    try{
        daytime.times.push(newTime);
        await dayTimeBl.updateTimesInDayTimes(daytime);
    } catch (error){
        logger.error(`Failed to push TimeRange: ${newTime} to update Daytime: ${daytime._id}`, error);
        throw new Error("Time pushed faild");
    }
    
}


const createTime = async (newTime:TimeRange , dayTimeId:string) => {

    try {
        const existdaytime: DayTimes = await existdayTime(dayTimeId);
        await isValidTimeRange(newTime ,existdaytime);
        if(await existTime(existdaytime, newTime)){
            throw new Error("Exist time");
        }
        newTime._id = '';
        await pushAndUpdatetDaytime(newTime, existdaytime);
        logger.info(`TimeRange: ${newTime} added to Daytime: ${dayTimeId}`);
    } catch (error) {
        logger.error(`Failed to add TimeRange: ${newTime} to Daytime: ${dayTimeId}  `, error);
        throw new Error("Time creation failed");
    }

}

const getTimeById = async ( dayTimeId: string, timeId: string) => {
    try {
        const dayTime:DayTimes = await existdayTime(dayTimeId);
        const time:TimeRange | undefined = dayTime.times.find(t=> t._id.toString() === timeId);
        if (!time) {
            logger.error(`TimeRange: ${timeId} at DayTime: ${dayTimeId} not found`);
            throw new Error("Time Range not found");
        }
        logger.info(`Successfully retrieved TimeRange with id: ${timeId} at DayTime: ${dayTimeId}`);
        return time;
    }
    catch (error){
        logger.error(`Faild fetch - TimeRange: ${timeId} at DayTime: ${dayTimeId}`, error);
        throw new Error("Faild fetch time by id");

    }
}



const updateTime = async (daytimeId: string, time: TimeRange) => {     
    try {
        if(!daytimeId || !time){
            throw new Error("Unvalid parameters");
        }
        const daytime: DayTimes = await dayTimeBl.getDayTimeById(daytimeId);
        const timeToUpdate:TimeRange  = await getTimeById(daytimeId, time._id);
        if(!daytime || !timeToUpdate){
            throw new Error("Not found"); 
        }
        if (time.start) {
            timeToUpdate.start = time.start;
        }
        if (time.end) {
            timeToUpdate.end = time.end;
        }
        daytime.times = daytime.times.filter(t=> t._id.toString() !== timeToUpdate._id.toString());           
        await isValidTimeRange(timeToUpdate , daytime);
        await pushAndUpdatetDaytime(timeToUpdate , daytime);
        logger.info(`TimeRange: ${timeToUpdate} update in Daytime: ${daytime}`);
    }
    catch (err) {
        logger.error(`Faild update - TimeRange: ${time._id} at DayTime: ${daytimeId}`, err);
        throw new Error("The update failed");
    }
}


const deleteTime = async (timeId: string , daytimeId:string ) => {
    try {
        const daytime = await dayTimeBl.getDayTimeById(daytimeId);        
        if(daytime && daytime.times){
            const lengthTimes = daytime.times.length;            
            daytime.times = daytime.times.filter(t=> t._id.toString() !== timeId.toString());
            if(lengthTimes !== daytime.times.length){
                await dayTimeBl.updateTimesInDayTimes(daytime);
                return; 
            }
        }
        logger.error(`Not found - delete TimeRange: ${timeId} at DayTime: ${daytimeId}`);
        throw new Error('Not found') 
           
    }
    catch (error) {
        logger.error(`Faild delete - TimeRange: ${timeId} at DayTime: ${daytimeId}`, error);
        throw new Error("The deletion failed");
    }
}

const catchTime = async (start:Date , end:Date) => {
    if (!isValidTimes(start, end)) {
        throw new Error("Invalid parameters");
    }
    try{
        const daytime:DayTimes| undefined= await dayTimeBl.getDayTimeByDate(start);           
        if(!daytime){
            logger.error(`Not found Date : ${start}`)
            throw new Error("Not Found Date");
        }
        
        const timeToCatch = daytime.times.find(t=>{ 
            (isSameTime(t.start , start) ||  isBefore(t.start , start)) 
            && (isSameTime(t.end , end) || isAfter(t.end , end))
        }
                        
        ); 
       
        if(!timeToCatch){
            logger.error(`Invalid parameters- catch time at DayTime: ${daytime._id}`);
            throw new Error('Invalid parameters')
        }
        await deleteTime(timeToCatch._id, daytime._id);
        
        if (isBefore(timeToCatch.start, start)) {
            const newTime: TimeRange = {
                start: timeToCatch.start,
                end: start,
                _id: '',
            };
            await createTime(newTime, daytime._id);
        }
        if (isAfter(timeToCatch.end, end)) {
            const newTime: TimeRange = {
                start: end,
                end: timeToCatch.end,
                _id: '',
            }
            await createTime(newTime , daytime._id);
        }
    } catch (error) {        
        logger.error(`Faild catch time at: ${start}`, error);
        throw new Error("Faild save new time range");
    }

}




export {
    getTimeById,
    createTime,
    updateTime,
    deleteTime,
    isValidTimes,
    catchTime,
    isSameDate,
    isBeforeTime,
    existTime,
}; 

