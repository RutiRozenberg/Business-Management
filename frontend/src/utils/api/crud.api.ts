import axios, { AxiosError, isAxiosError } from "axios";
import { StatusAndMessageError } from "../../models/status.and.message.error.model";
import { APIRequest } from "../../models/api.request.model";

const API_URL: string = import.meta.env.VITE_BASE_URL_SERVER ?? '';

const sendRequest = async <E, T>(apiRequest: APIRequest<E>): Promise<T | null> => {
    const { endpoint, method, token, data } = apiRequest;
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

const getAllData = async <T>(apiRequest:APIRequest<T>) => {
    const { endpoint, token } = apiRequest;
    return sendRequest<unknown, T[]>({ endpoint, method:'GET', token, });
};

const getDataById = async <T>(apiRequest:APIRequest<T>) => {
    const { endpoint, token } = apiRequest;
    return sendRequest<unknown, T>({ endpoint, method:'GET', token });
};

const postData = async <E, T>(apiRequest:APIRequest<E>) => {
    const { endpoint, token, data } = apiRequest;
    return sendRequest<E, T>({ endpoint, method:'POST', data, token });
};

const putData = async <E, T>(apiRequest:APIRequest<E>) => {
    const { endpoint, token, data } = apiRequest;
    return sendRequest<E, T>({ endpoint, method:'PUT', data, token });
};

const deleteData = async <T>(apiRequest:APIRequest<T>) => {
    const { endpoint, token } = apiRequest;
    return sendRequest<T, unknown>({ endpoint , method:'DELETE', token });
};

export { 
    getAllData,
    getDataById,
    postData,
    putData,
    deleteData
}
