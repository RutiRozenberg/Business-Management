
import mongoose, { Schema, Model } from 'mongoose';

interface ServiceDetails{
    price: number;
    name: string;
    duration : number; 
    description: string;
}

interface Service extends ServiceDetails{
    _id: string;
}

const serviceSchema: Schema = new Schema({
    price: Number,
    name: String,
    duration : Number, 
    description: String,
});

const servicetModel: Model<Service> = mongoose.model<Service>('services', serviceSchema);

export { servicetModel  , Service, ServiceDetails};