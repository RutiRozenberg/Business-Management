
export const getToken = () => {
    const token: string | null = sessionStorage.getItem('token');
    return token; 
}