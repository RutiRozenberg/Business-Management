import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, List, ListItem, TextField, useTheme } from "@mui/material"
import ResponsiveTypography from "../responsiveTypography.component"
import GridColumnCenter from "../gridColumnCenter";
import { useState } from "react";
import { MessageText } from "../../../models/discussion.models/message.models/message.text.model";
import { handleChange } from "../../../utils/forms/forms.function";
import { checkValidationErrors, FormErrors, YupSchema } from "../../../utils/forms/form.errors";
import * as yup from 'yup';
import { addMessage } from "../../../utils/socket/socket";
import { useAppSelector } from "../../../store/store";
import { MessagesDialogProps } from "../../../models/props.models/messagesDialod.props";
import DialogClose from "../dialod.close";


const validationSchema: YupSchema<MessageText> = yup.object().shape({
    message: yup.string().required('Message is required'),
});

const emptyMeaasgeTextData: MessageText = {
    message: '',
}

const MessagesDialog: React.FC<MessagesDialogProps> = ({ selectedDiscussion, openDialog, handleCloseDialog }) => {

    const theme = useTheme();
    const [formData, setFormData] = useState<MessageText>(emptyMeaasgeTextData);
    const [errors, setErrors] = useState<FormErrors>({});
    const discussions = useAppSelector(state => state.discussions.discussions);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValidForm: boolean = await checkValidationErrors(validationSchema, formData, setErrors);
        if (!isValidForm) {
            return;
        }
        addMessage(selectedDiscussion, formData);
        setFormData(emptyMeaasgeTextData);
    };

    return (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.secondary.dark,
                    fontWeight: 600,
                }}
            >
                Details Message
            </DialogTitle>

            <DialogContent>
                {discussions.length <= 0
                    ? <CircularProgress />
                    : discussions.map(dis => {
                        if (dis._id !== selectedDiscussion)
                            return null;
                        return (
                            <>

                                <List>

                                    <ListItem>
                                        <ResponsiveTypography
                                            customeVariant={{ xs: 'h6' }}
                                            sx={{
                                                mt: 4,
                                                fontWeight: 700,
                                            }}
                                        >
                                            {dis.title}
                                        </ResponsiveTypography>
                                    </ListItem>

                                    {dis.messages.map((message) => (
                                        <ListItem key={message._id} >

                                            <GridColumnCenter spacing={'1'}
                                                sx={{
                                                    boxShadow: 2,
                                                    borderRadius: 2,
                                                    mt: 2,
                                                    p: 2
                                                }}
                                            >

                                                <Grid item>

                                                    <ResponsiveTypography 
                                                        customeVariant={{ xs: 'body2' }} 
                                                        sx={{ fontWeight: '600' }}
                                                    >
                                                        {message.userId}
                                                    </ResponsiveTypography>
                                                </Grid>

                                                <Grid item>

                                                    <ResponsiveTypography 
                                                        customeVariant={{ xs: 'body1' }}
                                                    >
                                                        {message.message}
                                                    </ResponsiveTypography>
                                                </Grid>

                                            </GridColumnCenter>

                                        </ListItem>
                                    ))}


                                    <ListItem>
                                        <form onSubmit={handleSubmit}>
                                            <TextField
                                                name='message'
                                                label='Add new message'
                                                fullWidth
                                                value={formData.message}
                                                multiline
                                                rows={4}
                                                onChange={handleChange<MessageText>({ setFormData, formData })}
                                                error={Boolean(errors?.message)}
                                                helperText={errors?.message}
                                            />
                                            <Button type="submit" variant="contained" sx={{ mt: 2 }}>Send message</Button>

                                        </form>
                                    </ListItem>

                                </List>


                            </>
                        );
                    })}
            </DialogContent>
            <DialogClose handleCloseDialog={handleCloseDialog}/>
        </Dialog>
    )

}


export default MessagesDialog;