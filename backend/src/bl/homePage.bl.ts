import { HomePage, HomePageDetails } from '../models/homePage.tmodel'
import * as homePageServise from '../services/homePage.service'


const isValidHomepage = (homePage:HomePageDetails) =>{
    if(!homePage.about || !homePage.contact){
        return false;
    }
    return true;
}

const getHomePage = async () =>{
    try{
        const homePage:HomePage = await homePageServise.getHomePageText();
        if(homePage){
            return homePage;
        }
        throw new Error("Not Faund");
    } catch (error) {
        throw new Error("Faild");
    }
}

const createHomepage = async (homePage:HomePageDetails) => {
    try{
        if(!isValidHomepage(homePage)){
            throw new Error("Invalid Parameters");  
        }
        const existHomePage =  await homePageServise.getHomePageText();
        if(existHomePage){
            throw new Error("Home Page elready exist");    
        }
        const homePageCreated: HomePage = await homePageServise.creatHomePageText(homePage);
        if(homePageCreated){
            return homePageCreated;
        }
        throw new Error("Faild");
    } catch (error) {
        throw new Error("Faild");
    }
}

const updateHomePage = async (id: string, homePage: HomePage) => {
    try{
        if(id !== homePage._id || !isValidHomepage(homePage)){
            throw new Error("Invalid Parameters");
        }
        const homePageUpdated: HomePage | null = await homePageServise.updateHomePageText(id, homePage);
        if(!homePageUpdated){
            throw new Error("Faiid");
        }
        return homePageUpdated;
    } catch (error) {
        throw new Error("Faild");
    }   
}

export {
    getHomePage,
    createHomepage,
    updateHomePage,
}