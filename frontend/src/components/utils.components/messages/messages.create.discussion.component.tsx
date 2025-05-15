import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { TextField, Button, Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { getToken } from '../../../utils/api/token';
import ResponsiveTypography from '../responsiveTypography.component';
import GridColumnCenter from '../gridColumnCenter';
import { handleChange } from '../../../utils/forms/forms.function';
import { DiscussionForm } from '../../../models/discussion.models/discussion.form.model';
import { checkValidationErrors, FormErrors, YupSchema } from '../../../utils/forms/form.errors';
import { closeSocket, createDiscussion, openSocket } from '../../../utils/socket/socket';
import { Discussion } from '../../../models/discussion.models/discussion.model';
import { Message } from '../../../models/discussion.models/message.models/message.model';
import { pushNewDiscussion } from '../../../store/features/discussions.slice';
import DialogClose from '../dialod.close';
import NotLogin from '../../pages/notLogin.page/notLogin.component';
import { CreateDiscussionProps } from '../../../models/props.models/createDiscussion.props';



const validationSchema: YupSchema<DiscussionForm> = yup.object().shape({
    title: yup.string().required('Title is required'),
    message: yup.string().required('Message is required'),
});

const emptyInputsFormMessage: DiscussionForm = {
    title: '',
    message: '',
}

const CreateDiscussion: React.FC<CreateDiscussionProps> = ({ isOpenSocket }) => {

    const [formData, setFormData] = useState<DiscussionForm>(emptyInputsFormMessage);
    const [openDialog, setOpenDialog] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const user = useAppSelector(state => state.user.user);
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValidForm: boolean = await checkValidationErrors(validationSchema, formData, setErrors);
        if (!isValidForm) {
            return;
        } 
        if (!user) {
            setOpenDialog(true);
        }
        createDiscussion({ title: formData.title, messages: [{ message: formData.message, readBy: [], userId: '' }] });
        setFormData(emptyInputsFormMessage);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


    const handlecreatedDiscussion = (discussion: Discussion) => {
        dispatch(pushNewDiscussion({ discussion }));
    }

    useEffect(() => {
        if(!isOpenSocket){
            openSocket(getToken() || '', handlecreatedDiscussion,
            (id: string, message: Message)  => { console.log(id, ", ",message); }
        );
        }
        
        return () => {
            if(!isOpenSocket){
                closeSocket();
            }
        };
    }, []);


    return (
        <>
            <form onSubmit={handleSubmit}>

                <GridColumnCenter spacing={'2'}>
                    <Grid item>
                        <ResponsiveTypography customeVariant={{
                            xs: 'body1',
                            md: 'h6',
                            xl: 'h5'
                        }}>
                            If you need assistance or more information, please send a message.
                        </ResponsiveTypography>

                    </Grid>

                    <Grid item width={{ xs: 250, sm: 339 }}>
                        <TextField
                            label="Title"
                            name='title'
                            value={formData.title}
                            onChange={handleChange(setFormData)}
                            fullWidth
                            error={Boolean(errors?.title)}
                            helperText={errors?.title}
                        />
                    </Grid>
                    <Grid item  width={{ xs: 250, sm: 339 }}>
                        <TextField
                            name='message'
                            label="Message"
                            value={formData.message}
                            onChange={handleChange(setFormData)}
                            fullWidth
                            multiline
                            rows={5}
                            error={Boolean(errors?.message)}
                            helperText={errors?.message}
                        />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" type='submit'>
                            Send Message
                        </Button>
                    </Grid>

                </GridColumnCenter>
            </form>


            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Sign In Required</DialogTitle>
                <DialogContent>
                    <NotLogin/>
                </DialogContent>
                <DialogClose handleCloseDialog={handleCloseDialog}/>
            </Dialog>
        </>
    );
};

export default CreateDiscussion;