import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import * as yup from 'yup';
import { postData } from '../../../../utils/api/crud.api';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../store/store';
import { fetchAdmin } from '../../../../store/features/admin.slice';

interface LoginAdminData {
    name: string | null;
    email: string;
    password: string;
    adminPassword: string;
}

const validationSchema = yup.object({
    name: yup.string(),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required'),
    adminPassword: yup.string().required('Admin password is required'),
});

const AdminLogin: React.FC = () => {

    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState<LoginAdminData>({
        name: '',
        email: '',
        password: '',
        adminPassword: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin =  async () => {
        try {
            const response = await postData({ data: formData, endpoint: 'admin/signin' });
            if (response) {
                sessionStorage.setItem('token', response as string);
                dispatch(fetchAdmin());
                navigate('/admin');
            } else {
                throw new Error('nbjrfgb');
            }
        } catch {
            console.log('Login faild');
        }
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors({});
        try {
            if( await validationSchema.validate(formData, { abortEarly: false })){
                handleLogin();
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
        };

    }


    return (
        <>
            <Container maxWidth="sm">
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="name"
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        error={Boolean(errors.username)}
                        helperText={errors.username}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="email"
                        type="email"
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="password"
                        type="password"
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Admin Password"
                        type="password"
                        name='adminPassword'
                        value={formData.adminPassword}
                        onChange={handleChange}
                        error={Boolean(errors.adminPassword)}
                        helperText={errors.adminPassword}
                    />
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Login
                    </Button>
                </form>
            </Container>
        </>
    );
};

export default AdminLogin;