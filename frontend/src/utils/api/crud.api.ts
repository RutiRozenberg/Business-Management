import axios, { AxiosError, isAxiosError, Method } from "axios";
import { StatusAndMessageError } from "../../models/statusAndMessageError.model";

const API_URL: string = import.meta.env.VITE_BASE_URL_SERVER ?? '';

const sendRequest = async <T>(endpoint: string, method: Method, data?: unknown , token?:string): Promise<T | null> => {
    try {
        const url = `${API_URL}${endpoint}`;
        const headers = token ? { authorization: `Bearer ${token}` } : {};
        const response = await axios.request<T>({
            url,
            method,
            headers,
            data,
        });
        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const axiosError = error as AxiosError;
            const errorMessage = `Axios error ${method}ing data at ${endpoint}: ${axiosError.message}`;
            const errorStatus = axiosError.response ? axiosError.response.status : null;
            throw { message: errorMessage, status: errorStatus } as StatusAndMessageError;
        } else {
            const errorMessage = `Error ${method}ing data at ${endpoint}: ${error instanceof Error ? error.message : 'Unknown error'}`;
            throw { message: errorMessage };
        }
    }
};

const getAllData = async <T>(endpoint:string, token?:string) => {
    return sendRequest<T[]>(endpoint, 'GET', null, token);
};

const getDataById = async <T>(endpoint:string, token?:string) => {
    return sendRequest<T>( endpoint, 'GET', token);
};

const postData = async <T>(endpoint:string, newData: T, token?:string) => {
    return sendRequest<T>(endpoint, 'POST', newData, token);
};

const putData = async <T>(endpoint:string, updatedData: T, token?:string) => {
    return sendRequest<T>( endpoint, 'PUT', updatedData, token);
};

const deleteData = async (endpoint:string, token?:string) => {
    return sendRequest<unknown>( endpoint , 'DELETE', token);
};

export { 
    getAllData,
    getDataById,
    postData,
    putData,
    deleteData
}
