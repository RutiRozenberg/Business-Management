import { CardContent, CircularProgress, Card } from "@mui/material";
import ResponsiveTypography from "../../../utils.components/responsiveTypography.component";
import { useEffect, useState } from "react";
import { HomecardProps } from "../../../../models/props.models/homeCardProps";

const HomeCard: React.FC<HomecardProps> = ({text , title}) =>{
    
    const [isLoading, setIsLoading] = useState(true); 
    const [content, setContent] = useState<HomecardProps>({title, text});

    useEffect(()=>{
        setContent({title, text});
        if(text !== ''){
            setIsLoading(false);
        }
    }, [text, title]);
    
    return (
        <Card 
          style={{
            padding: 10, 
            marginTop:30, 
            marginBottom:30,
          }}
        >
          <CardContent>
            <ResponsiveTypography
              customeVariant={{xs: 'h4' , md: 'h3',}}
            >
              {content.title}
            </ResponsiveTypography>
            {isLoading? 
            <CircularProgress size={24} color="inherit" /> 
              : <ResponsiveTypography customeVariant={{md: 'h6', lg: 'h5',}}>
                {content.text}
                </ResponsiveTypography>}
          </CardContent>
        </Card>
    )
}

export default HomeCard;