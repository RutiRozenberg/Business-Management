
export const getToken = () => {
    const token: string | null = sessionStorage.getItem('token');
    return token; 
}

export const getAdminToken = () => {
    const token: string | null = sessionStorage.getItem('admintoken');
    return token; 
}