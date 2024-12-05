import { DayTimes, daytimeModel } from "../models/dayTimes.model"


const getAllDayTimes = async () => {
    try {
        const allDayTimes: DayTimes[] = await daytimeModel.find() ;
        return allDayTimes;
    } catch {
        throw new Error("Failed to load day times from the database");
    }
}

const getDayTimesById = async (id:string) => {
    try {
        const dayTimes: DayTimes | null= await daytimeModel.findById(id);
        return dayTimes; 
    } catch {
        throw new Error("Not Found");
    }
}

const craeteDayTimes = async (dayTimes:unknown) => {
    try{
        const newDayTimes = new daytimeModel(dayTimes);        
        const saveDayTimes = await newDayTimes.save();
        return saveDayTimes;   
    } catch {
        throw new Error("Failed to save day times to the database"); 
    }
}

const updateDayTimes = async (id:string, dayTimesToUpdate:DayTimes) => {
    try{
        await daytimeModel.findByIdAndUpdate(id, dayTimesToUpdate);
    } catch {
        throw new Error('Failed to update day times in the database');
    }
}

const deleteDayTimes = async (id: string) => {
    try{
        await daytimeModel.findByIdAndDelete(id);
    } catch {
        throw new Error("The deletion failed");
    }
}

const getDayTimeByDate = async (date: Date) =>{
    try{
        const dayTime: DayTimes | null = await daytimeModel.findOne({date});
        return dayTime;
    } catch{
        throw new Error('Faild');
    }
}

export { getAllDayTimes , getDayTimesById , craeteDayTimes , updateDayTimes , deleteDayTimes , getDayTimeByDate}
