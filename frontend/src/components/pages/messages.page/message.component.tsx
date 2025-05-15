import { Discussion } from "../../../models/discussion.models/discussion.model";
import { useAppSelector } from "../../../store/store";
import { getAllData } from "../../../utils/api/crud.api";
import { getToken } from "../../../utils/api/token";
import MessagesList from "../../utils.components/messages/messages.list.component";
import CreateDiscussion from "../../utils.components/messages/messages.create.discussion.component";
import { Box } from "@mui/material";


const Messages: React.FC = () => {

    const userId = useAppSelector(state => state.user.user?._id)

    const loadDiscussionByUser = async (): Promise<Discussion[]> => {
       try{
            const dis: Discussion[] | null = await getAllData({endpoint: `discussion/user/${userId}` , token: getToken() || ''});
            if(dis){
                return dis;
            } 
       } catch (err){
            console.error(err);
       }
        return [];
    }

    return (
        <>  
            <MessagesList loadData={loadDiscussionByUser} token={getToken() || ''}></MessagesList>

            <Box 
                sx={{ 
                    m: '2vh 10vw',
                    borderRadius: 2,
                    boxShadow: 2,
                    p: 4,
                }}
            >
                <CreateDiscussion isOpenSocket={true}/>
            </Box>
           
        </>
    );
};

export default Messages;