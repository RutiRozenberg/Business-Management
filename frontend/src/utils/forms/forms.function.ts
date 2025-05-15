import React from 'react';

interface UseStateHandleChangeParams<T> {
    formData: T;
    setFormData: React.Dispatch<React.SetStateAction<T>>;
}

export const handleChange = <T>({ setFormData }: UseStateHandleChangeParams<T>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
};
