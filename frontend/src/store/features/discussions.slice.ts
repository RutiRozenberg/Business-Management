import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Discussion } from "../../models/discussion.models/discussion.model";
import { Message } from "../../models/discussion.models/message.models/message.model";


interface DiscussionsState {
    discussions: Discussion[];
}

const initialState: DiscussionsState = {
    discussions: [],
}

const discussionsSlice = createSlice({
    name: 'discussion',
    initialState,
    reducers: {
        setData(state, action: PayloadAction<DiscussionsState>){
            state.discussions = action.payload.discussions;
        },
        pushNewDiscussion(state, action: PayloadAction<{discussion: Discussion}>){
            state.discussions = [...state.discussions , action.payload.discussion];
            
        },
        pushNewMessage(state, action: PayloadAction<{ discussionId: string, newMessage: Message}>){
            state.discussions =  state.discussions.map(dis => {
                if(dis._id === action.payload.discussionId){
                    return {...dis, messages: [...dis.messages, action.payload.newMessage]}
                }
                return dis;
            })
        }
    }
});


export const {setData, pushNewDiscussion, pushNewMessage } = discussionsSlice.actions;

export default discussionsSlice.reducer;