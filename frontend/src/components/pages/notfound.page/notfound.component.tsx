import { Container, Box, Button, useTheme } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import ResponsiveTypography from "../../utils.components/responsive.typography.component";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const hundleGoBack = () => {
        navigate(-1);
    }
    const hundleGoHome = () => {
        navigate('/');
    }

    return (
        <Container sx={{ marginTop: 10, textAlign: 'center' }}>
            <Box>
                <ErrorOutline sx={{ fontSize: 100, color: theme.palette.error.main }} />
                <ResponsiveTypography
                    customeVariant={{
                        xs: 'h4',
                        md: 'h3',
                        lg: 'h2'
                    }}
                >
                    Page Not Found
                </ResponsiveTypography>

                <ResponsiveTypography
                    customeVariant={{
                        md: 'h6',
                        lg: 'h5'
                    }}
                    sx={{ margin: '0vh 10vw'}}
                >
                    Oops! The page you’re looking for doesn’t exist.
                    It might have been removed, had its name changed,
                    or is temporarily unavailable.
                </ResponsiveTypography>

                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={hundleGoBack} 
                    sx={{ m: 2 }}
                >
                    Go Back
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={hundleGoHome} 
                    sx={{ m: 2 }}
                >
                    Go Home Page 
                </Button>
            </Box>
        </Container>
    );
}

export default NotFound;
