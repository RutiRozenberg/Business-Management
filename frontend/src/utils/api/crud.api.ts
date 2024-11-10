import axios, { Method } from "axios";

const API_URL: string = import.meta.env.VITE_BASE_URL_SERVER ?? '';

const sendRequest = async <T>(endpoint: string, method: Method, data?: unknown): Promise<T | null> => {
    try {
        const url = `${API_URL}${endpoint}`;
        const response = await axios.request<T>({
            url,
            method,
            data,
        });
        return response.data;
    } catch (error) {
        console.error(`Error ${method}ing data at ${endpoint}:`, error);
        return null;
    }
};

const getAllData = async <T>(endpoint:string) => {
    return sendRequest<T[]>(endpoint, 'GET');
};

const getDataById = async <T>(endpoint:string) => {
    return sendRequest<T>( endpoint, 'GET');
};

const postData = async <T>(endpoint:string, newData: T) => {
    return sendRequest<T>(endpoint, 'POST', newData);
};

const putData = async <T>(endpoint:string, updatedData: T) => {
    return sendRequest<T>( endpoint, 'PUT', updatedData);
};

const deleteData = async (endpoint:string) => {
    return sendRequest<unknown>( endpoint , 'DELETE');
};

export { 
    getAllData,
    getDataById,
    postData,
    putData,
    deleteData
}
