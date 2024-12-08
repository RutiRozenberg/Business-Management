import { Method } from "axios";

export interface APIRequest<T>{
    endpoint: string;
    method?: Method;
    data?: T;
    token?: string;
}