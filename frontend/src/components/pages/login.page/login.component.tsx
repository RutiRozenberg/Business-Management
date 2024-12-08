import React, { useState } from 'react';
import { TextField, Button, Grid, Card, CardContent, Container, CircularProgress, IconButton } from '@mui/material';
import * as yup from 'yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GridColumnCenter from '../../utils.components/gridColumnCenter';
import ResponsiveTypography from '../../utils.components/responsiveTypography.component';
import { User } from '../../../models/user.model';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../../utils/api/crud.api';
import { useAppDispatch } from '../../../store/store';
import { fetchUser } from '../../../store/features/user.slice';
import { StatusAndMessageError } from '../../../models/statusAndMessageError.model';
import CustomErrorAlert from './login.page.components/customErrorAlert';
import { UserDetails } from '../../../models/userDetails';


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
    const [formData, setFormData] = useState<User>({
        name: '',
        email: '',
        password: '',
        _id: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showAlert, setShowAlert] = useState(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleToggleSignUp = () => {
        setIsSignUp(!isSignUp);
    };

    const handleSignIn = async () => {
        const emps: emailandpass = { email: formData.email, password: formData.password }
        try {
            const response: unknown = await postData('signin', emps);
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
            await postData('signup', userData);
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
        try {
            if (isSignUp) {
                await SingupSchema.validate(formData, { abortEarly: false });
                handleSignUp();
            } else {
                await SinginSchema.validate(formData, { abortEarly: false });
                handleSignIn();
            }
        } catch (error: unknown) {
            const validationErrors: { [key: string]: string } = {};
            if (error instanceof yup.ValidationError) {
                error.inner.forEach((err: yup.ValidationError) => {
                    if (err.path) {
                        validationErrors[err.path] = err.message;
                    }
                });
                setErrors(validationErrors);
            }
        } finally {
            setIsLoading(false);
        }
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
                                            <ResponsiveTypography additionalText={isSignUp ? 'Sign Up' : 'Sign In'} variant={{ xs: 'h6', md: 'h5' }}></ResponsiveTypography>
                                        </Grid>

                                        <Grid item>
                                            <GridColumnCenter spacing={'2'}>

                                                {isSignUp ? <Grid item>
                                                    <TextField
                                                        label="Name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
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
                                                        onChange={handleChange}
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
                                                        onChange={handleChange}
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
