import { DayTimes } from "../models/dayTimes.model";
import  * as dayTimesService from "../services/dayTimes.service";
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

const createDayTimes = async (newDayTimes: DayTimes) => {
    try {
        if (await isValidDayTimes(newDayTimes)) {    
            const daytimeData = {date: newDayTimes.date};  
            const newDayTimesCreated: DayTimes | null = await dayTimesService.craeteDayTimes(daytimeData);
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
    
    if (id != dayTime.id && !(await isValidDayTimes(dayTime))) {
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

const isValidDayTimes = async (dayTimes: DayTimes) => {
    const currentDate = new Date();
    const dayTimeDate = new Date(dayTimes.date);
    
    if ((dayTimeDate != null )&& (dayTimeDate > currentDate)) {        
        const date: DayTimes | null = await dayTimesService.getDayTimeByDate(dayTimes.date);
        if(date === null){
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
