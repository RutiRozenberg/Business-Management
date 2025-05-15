import React from 'react';

export const handleChange = <T>(setFormData : React.Dispatch<React.SetStateAction<T>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
};
