import { Discussion } from "../discussion.models/discussion.model";

export interface MessageListProps {
    loadData: () => Promise<Discussion[]>;
    token: string;
}