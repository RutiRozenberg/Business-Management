import { MessageText } from "./message.text.model";

export interface MessageDetails extends MessageText{
    userId: string;
    readBy: string[];
}