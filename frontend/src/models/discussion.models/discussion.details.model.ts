import { DiscussionTitle } from "./discussion.title.model";
import { MessageDetails } from "./message.models/message.details.model";

export interface DiscussionDetails extends DiscussionTitle{
    messages: MessageDetails[];
}