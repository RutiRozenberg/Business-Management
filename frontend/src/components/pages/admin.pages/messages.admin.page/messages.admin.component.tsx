import MessagesList from '../../../utils.components/messages/messages.list.component';
import { Discussion } from '../../../../models/discussion.models/discussion.model';
import { getAllData } from '../../../../utils/api/crud.api';
import { getAdminToken } from '../../../../utils/api/token';

const MessagesAdmin: React.FC = () => {


    const loadDiscussion = async (): Promise<Discussion[]> => {
       try{
            const dis: Discussion[] | null = await getAllData({endpoint: 'discussions' , token: getAdminToken() || ''});
            if(dis){
                return dis;
            } 
       } catch (err){
            console.error(err);
       }
        return [];
    }

    return (
        <MessagesList loadData={loadDiscussion} token={getAdminToken() || ''}></MessagesList>
    );
};

export default MessagesAdmin;