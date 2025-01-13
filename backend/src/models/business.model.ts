
import mongoose, { Schema, Model } from 'mongoose';

interface BusinessDetails{
    address: string;
    name: string;
    email: string;
    phone: string;
}

interface Business extends BusinessDetails{
    _id: string;
}

const businessSchema: Schema = new Schema({
    address: String,
    name: String,
    email: String,
    phone: String
});

const businesstModel: Model<Business> = mongoose.model<Business>('busniess', businessSchema);

export { businesstModel  ,Business, BusinessDetails};