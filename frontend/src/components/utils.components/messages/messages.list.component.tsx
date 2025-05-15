import React, { useEffect, useState } from 'react';
import { List, ListItem, Box, useTheme, CircularProgress, alpha, } from '@mui/material';
import TitleTypography from '../titleTypography.component';
import MessagesDialog from './messages.dialog.component';
import { closeSocket, openSocket } from '../../../utils/socket/socket';
import { Message } from '../../../models/discussion.models/message.models/message.model';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { pushNewDiscussion, pushNewMessage, setData } from '../../../store/features/discussions.slice';
import ResponsiveTypography from '../responsiveTypography.component';
import { Discussion } from '../../../models/discussion.models/discussion.model';
import { MessageListProps } from '../../../models/props.models/messageList.props';


const MessagesList: React.FC<MessageListProps> = ({ loadData, token }) => {

    const [selectedDiscussion, setSelectedDiscussion] = useState<string>('');
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const discussions = useAppSelector(state => state.discussions.discussions);

    const theme = useTheme();

    const handleMessageClick = (discussionId: string) => {
        setSelectedDiscussion(discussionId);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedDiscussion('');
    };

    const handleDiscussionCreated = (discussion: Discussion) => {
        dispatch(pushNewDiscussion({ discussion }));
    }

    const pushNewMassageToDiscussion = (discussionId: string, newMessage: Message) => {
        dispatch(pushNewMessage({ discussionId, newMessage }));
    }

    const fetchData = async () => {
        dispatch(setData({ discussions: await loadData() }));
    }

    useEffect(() => {
        fetchData();
        openSocket(token, handleDiscussionCreated, pushNewMassageToDiscussion);
        return () => {
            closeSocket();
        };
    }, [])


    return (
        <>

            <TitleTypography title={'Your Messages'}></TitleTypography>
            <Box sx={{ m: '5vh 10vw' }}>
                <List>

                    <ListItem sx={{
                        boxShadow: 1,
                        borderRadius: 1,
                        mt: 2,
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.secondary.dark,
                    }}>

                        <ResponsiveTypography
                            customeVariant={{ xs: 'body1' }}
                            noWrap
                            width={'30%'}
                        >
                            Send By
                        </ResponsiveTypography>
                        <ResponsiveTypography
                            customeVariant={{ xs: 'body1' }}
                            noWrap
                            width={'65%'}
                            sx={{
                                ml: 2,
                            }}
                        >
                            Title
                        </ResponsiveTypography>

                    </ListItem>

                    {discussions.length <= 0 ? <CircularProgress /> :
                        discussions.map((discus) => (
                            <ListItem
                                key={discus._id}
                                onClick={() => handleMessageClick(discus._id)}
                                sx={{
                                    boxShadow: `0px 2px 3px ${alpha(theme.palette.secondary.light, 0.8)}`,
                                    borderRadius: 1,
                                    mt: 2,
                                }}
                            >

                                <ResponsiveTypography
                                    customeVariant={{ xs: 'body1' }}
                                    noWrap
                                    width={'30%'}
                                >
                                    {discus.messages[0].userId}
                                </ResponsiveTypography>
                                <ResponsiveTypography
                                    customeVariant={{ xs: 'body1' }}
                                    noWrap
                                    width={'65%'}
                                    sx={{
                                        ml: 2,
                                    }}
                                >
                                    {discus.title}
                                </ResponsiveTypography>

                            </ListItem>
                        ))}
                </List>


            </Box>

            <MessagesDialog selectedDiscussion={selectedDiscussion} handleCloseDialog={handleCloseDialog} openDialog={openDialog} />
        </>
    );
};

export default MessagesList;
