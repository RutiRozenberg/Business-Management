import { isAfter } from "date-fns";
import { DayTimes, DayTimesDetails } from "../models/daytimes.model";
import  * as dayTimesService from "../services/daytimes.service";
import { isSameDate } from "./time.bl";

const getAllDayTimes = async () => {
    try {
        const dayTimes: DayTimes[] = await dayTimesService.getAllDayTimes();
        if (dayTimes.length > 0) {
            return dayTimes;
        }
        else {
            throw new Error("day times does not found");
        }
    }
    catch {
        throw new Error("Faild");
    }
}

const getDayTimeById = async (id: string) => {
    try {
        if(id !== null){
            const dayTimes: DayTimes | null = await dayTimesService.getDayTimesById(id);
            if (dayTimes === null) {
                throw new Error("Not found");
            }
            return dayTimes;   
        }
        throw new Error("Invalid Parameters");    
    }
    catch (error) {
        throw new Error("Faild");        
    }
}

const createDayTimes = async (newDayTimes: DayTimesDetails) => {
    try {
        if (await isValidDayTimes(newDayTimes)) {    
            const newDayTimesCreated: DayTimes | null = await dayTimesService.craeteDayTimes(newDayTimes);
            if(newDayTimesCreated !== null){
                return newDayTimesCreated;
            }
            else{
                throw new Error("Meeting creation failed");
            }
        }else {
                throw new Error("Invalid parameters");
        }
    }
    catch (err) {
        throw new Error("Meeting creation failed");
    }
}

const updateDayTimes = async (id: string, dayTime: DayTimes) => {
    
    if (id != dayTime._id && !(await isValidDayTimes(dayTime))) {
        throw new Error("Invalid parameters");
    }
    const dayTimeToUpdate = (await dayTimesService.getDayTimesById(id)) as unknown as DayTimes;
    if (dayTimeToUpdate.date) {
        dayTimeToUpdate.date = dayTime.date;
    }
    try {
        await dayTimesService.updateDayTimes(id, dayTimeToUpdate);
    }
    catch (err) {
        throw new Error("The update failed");
    }
}


const deleteDayTimes = async (id: string) => {
    try {
        await dayTimesService.deleteDayTimes(id);
    }
    catch {
        throw new Error("The deletion failed");
    }
}

const isValidDayTimes = async (dayTimes: DayTimesDetails) => {
    const currentDate = new Date();
    const dayTimeDate = new Date(dayTimes.date);
    
    if ( dayTimeDate && (isAfter(dayTimeDate,currentDate) || isSameDate(dayTimeDate,currentDate))) {        
        const date: DayTimes | null = await dayTimesService.getDayTimeByDate(dayTimes.date);
        if(!date){
            return true;
        }
    }
    
    return false;
}

const getDayTimeByDate = async (date:Date) =>{
    try{
        const allDayTimes: DayTimes[] = await getAllDayTimes();
        const daytime: DayTimes | undefined = allDayTimes.find(daytime => isSameDate(daytime.date, date));
        if(daytime) {
            return daytime;
        }
        throw new Error("Not found");
    }
    catch{
        throw new Error("Faild");
    }
}

const updateTimesInDayTimes = async(daytime:DayTimes) => {
    try{
        await dayTimesService.updateDayTimes(daytime._id , daytime);
    } catch {
        throw new Error("faild update times"); 
    }
}


export { getAllDayTimes , getDayTimeById , createDayTimes , updateDayTimes , deleteDayTimes , getDayTimeByDate , updateTimesInDayTimes} 
