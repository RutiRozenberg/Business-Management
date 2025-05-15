import { MessageDetails } from "./message.details.model";

export interface Message extends MessageDetails {
    _id: string;
}