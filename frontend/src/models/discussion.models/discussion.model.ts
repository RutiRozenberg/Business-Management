import { DiscussionTitle } from "./discussion.title.model";
import { Message } from "./message.models/message.model";

export interface Discussion extends DiscussionTitle{
    _id: string;
    messages: Message[]
}