import mongoose, { Model, Schema } from "mongoose";

interface HomePageDetails{
    about: string;
    contact: string;
}

interface HomePage extends HomePageDetails{
    _id: string;
}

const homePageSchema: Schema = new Schema ({
    about: String,
    contact: String,
});

const homePageModel: Model<HomePage> = mongoose.model<HomePage>('home-page', homePageSchema);

export{
    homePageModel,
    HomePage,
    HomePageDetails
}