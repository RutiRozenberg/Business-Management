import { useEffect } from "react";
import { useAppSelector } from "../../../../store/store";
import AdminAppBar from "../../../admin.app.bar";
import { useNavigate } from "react-router-dom";

const MainAdmin = () => {

    const admin = useAppSelector(state => state.admin);
    const navigate = useNavigate();
   
    useEffect(()=>{
        if(!admin.admin){
            navigate('login');
        } 
    },[admin, navigate]);

    return (
        <>
            {admin &&  <AdminAppBar/> }
        </>
    )
}

export default MainAdmin;