import { HomePage, HomePageDetails, homePageModel } from "../models/homePage.tmodel"

const getHomePageText = async () => {
    try{
        const homePage:HomePage[] = await homePageModel.find().exec(); 
        return homePage[0];
    } catch (err) {
        throw new Error("Faild Load home page text");
    }
}

const creatHomePageText = async (getHomePageText: HomePageDetails) => {
    try{
        const NewHomePage = new homePageModel(getHomePageText);
        const homePageCreated:HomePage = await NewHomePage.save();
        return homePageCreated;
    } catch (err) {
        throw new Error("Faild created")
    }
}

const updateHomePageText = async (id: string, homePage: HomePage) => {
    try{
        const homePageUpdated: HomePage | null=  await homePageModel.findByIdAndUpdate(id, homePage);
        return homePageUpdated;
    } catch (err) {
        throw new Error("Faild Updated"); 
    }
}

export {
    getHomePageText,
    creatHomePageText,
    updateHomePageText,
}