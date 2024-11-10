import { Helmet } from "react-helmet"
import React, { useEffect } from "react";
import { fetchBusiness } from "../../store/features/business.slice";
import { useAppDispatch, useAppSelector } from "../../store/store";


interface TitlePageProps {
    title: string;
}

const TitlePage: React.FC<TitlePageProps> = ({ title }) => {

    const business = useAppSelector((state) => state.business.business);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchBusiness());
    }, [dispatch]);
    
    return <Helmet>
        <title>{business.name} - {title}</title>
    </Helmet>;
}

export default TitlePage;