import { Box, useTheme } from "@mui/material";
import ResponsiveTypography from "../../../utils.components/responsiveTypography.component";
import { useNavigate } from "react-router-dom";
import { IconTextLinkProps } from "../../../../models/props.models/icontextLink.props";


const IconTextLink: React.FC<IconTextLinkProps> = ({ icon: Icon, beforeText, linkText, afterText, url }) => {

    const navigate = useNavigate();
    const theme = useTheme();
    const handleNavigate = (url: string) => {
        navigate(url);
    }

    return (
        <Box display={'flex'}>
            <Icon
                sx={{
                    fontSize: { xs: 20, lg: 27 },
                    mr: 2,
                    color: theme.palette.secondary.main,
                }}
            />

            <ResponsiveTypography
                customeVariant={{ lg: 'h6', }}
            >
                {beforeText}
                <ResponsiveTypography
                    customeVariant={{ lg: 'h6', }}
                    component={'span'}
                    sx={{
                        color: theme.palette.primary.dark,
                        margin: '0px 5px',
                    }}
                    onClick={() => handleNavigate(url)}
                >
                    {linkText}
                </ResponsiveTypography>
                {afterText}
            </ResponsiveTypography>
        </Box>
    )
}

export default IconTextLink;