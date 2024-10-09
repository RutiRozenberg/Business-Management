import axios from "axios";
import { Service } from "../../models/service.model";

const API_URL: string = import.meta.env.VITE_BASE_URL_SERVER ?? '';


export const getAllServices = async () => {
    try {
        const url = `${API_URL}services`;
        const response = await axios.get<Service[]>(url);        
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
};


export const createService = async (newService: Service) => {
    try {
        const url = `${API_URL}service`;
        const response = await axios.post(url, newService);
        return response.data;
    } catch (error) {
        console.error('Error creating service:', error);
        return null;
    }
};

export const updateService = async (updatedService: Service) => {
    try {
        const response = await axios.put(`${API_URL}service/${updatedService.id}`, updatedService);
        return response.data;
    } catch (error) {
        console.error('Error updating service:', error);
        return null;
    }
};

export const deleteService = async (serviceId: string) => {
    try {
        const response = await axios.delete(`${API_URL}service/${serviceId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting service:', error);
        return null;
    }
};
