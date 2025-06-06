import React, { useState } from 'react';
import { TextField, Button, Grid, Card, CardContent, Container, CircularProgress, IconButton } from '@mui/material';
import * as yup from 'yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GridColumnCenter from '../../utils.components/grid.column.center';
import ResponsiveTypography from '../../utils.components/responsive.typography.component';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../../utils/api/crud.api';
import { useAppDispatch } from '../../../store/store';
import { fetchUser } from '../../../store/features/user.slice';
import { StatusAndMessageError } from '../../../models/status.and.message.error.model';
import CustomErrorAlert from './login.page.components/customErrorAlert';
import { UserDetails } from '../../../models/user.models/user.details';
import { checkValidationErrors } from '../../../utils/forms/form.errors';
import { handleChange } from '../../../utils/forms/forms.function';


interface emailandpass {
    email: string,
    password: string,
}

const SinginSchema = yup.object().shape({
    name: yup.string(),
    email: yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(10, 'Password must be at most 10 characters')
        .required('Password is required'),
});

const SingupSchema = yup.object().shape({
    name: yup.string()
        .matches(/^[a-zA-Z]+$/, 'Name must contain only letters')
        .min(3, 'Name must be at least 3 characters')
        .max(20, 'Name must be at most 20 characters')
        .required('Name is required'),
    email: yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(10, 'Password must be at most 10 characters')
        .required('Password is required'),
});


const Login: React.FC = () => {

    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<UserDetails>({
        name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showAlert, setShowAlert] = useState(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleToggleSignUp = () => {
        setIsSignUp(!isSignUp);
    };

    const handleSignIn = async () => {
        const emps: emailandpass = { email: formData.email, password: formData.password }
        try {
            const response: unknown = await postData({
                endpoint:'signin', 
                data:emps
            });
            if (response) {
                sessionStorage.setItem('token', response as string);
                dispatch(fetchUser);
                navigate('../');
            } else {
                throw new Error('nbjrfgb');
            }
        } catch (error: unknown) {
            if (error as StatusAndMessageError) {
                const statusError: number = (error as StatusAndMessageError).status;
                if (statusError === 401) {
                    setShowAlert(true);
                }
            }
            console.error("error sign in", error);
        }
    };

    const handleSignUp = async () => {
        const userData: UserDetails = {
            email: formData.email,
            name: formData.name,
            password: formData.password,
        };
        try {
            await postData({
                endpoint:'signup', 
                data: userData
            });
            handleSignIn();
        } catch (error) {
            if (error as StatusAndMessageError) {
                const statusError: number = (error as StatusAndMessageError).status;
                if (statusError === 400) {
                    setShowAlert(true);
                }
            }
            console.error("error sign up", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        
        setShowAlert(false);
        e.preventDefault();
        setIsLoading(true);

        const shchema = isSignUp? SingupSchema : SinginSchema;
        const isValidForm: boolean = await checkValidationErrors(shchema, formData, setErrors);
        if (isValidForm) {
            const handleForm = isSignUp? handleSignUp : handleSignIn;
            handleForm();
        } 

        setIsLoading(false);
    };


    return (
        <>
            <Container>
                <IconButton onClick={handleGoBack}>
                    <ArrowBackIcon />
                </IconButton>
            </Container>
            {showAlert ? <CustomErrorAlert message='Bad Requestb'></CustomErrorAlert> : <></>}
            <GridColumnCenter spacing={'2'}>
                <Grid item mt={10}>
                    <Container>
                        <Card sx={{ p: { xs: '0', md: 5 }, boxShadow: { xs: 'none', md: 1 } }} >
                            <CardContent>

                                <form onSubmit={handleSubmit}>

                                    <GridColumnCenter spacing='5'>

                                        <Grid item>
                                            <ResponsiveTypography customeVariant={{ xs: 'h6', md: 'h5' }}>
                                                {isSignUp ? 'Sign Up' : 'Sign In'}
                                                </ResponsiveTypography>
                                        </Grid>

                                        <Grid item>
                                            <GridColumnCenter spacing={'2'}>

                                                {isSignUp ? <Grid item>
                                                    <TextField
                                                        label="Name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange(setFormData)}
                                                        error={!!errors.name}
                                                        helperText={errors.name}
                                                    />
                                                </Grid>
                                                    : <></>
                                                }

                                                <Grid item>
                                                    <TextField
                                                        label="Email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange(setFormData)}
                                                        error={!!errors.email}
                                                        helperText={errors.email}
                                                    />
                                                </Grid>

                                                <Grid item>
                                                    <TextField
                                                        label="Password"
                                                        name="password"
                                                        type="password"
                                                        value={formData.password}
                                                        onChange={handleChange(setFormData)}
                                                        error={!!errors.password}
                                                        helperText={errors.password}
                                                    />
                                                </Grid>

                                            </GridColumnCenter>
                                        </Grid>

                                        <Grid item>
                                            <GridColumnCenter spacing={'2'}>
                                                <Grid item>
                                                    <Button type="submit" variant="contained" color="primary">
                                                        {isLoading ? <CircularProgress size={24} color="inherit" /> : isSignUp ? 'Sign Up' : 'Sign In'}
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button color="secondary" onClick={handleToggleSignUp} >
                                                        {isSignUp ? 'Already have an account? Sign In' : 'New user? Sign Up'}
                                                    </Button>
                                                </Grid>
                                            </GridColumnCenter>
                                        </Grid>

                                    </GridColumnCenter>

                                </form>

                            </CardContent>
                        </Card>
                    </Container>

                </Grid>
            </GridColumnCenter>
        </>

    );
};

export default Login;
