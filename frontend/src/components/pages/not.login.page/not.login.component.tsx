import ResponsiveTypography from "../../utils.components/responsive.typography.component";
import { Box, Container, useTheme } from "@mui/material";
import { Home, Lock, Person, PersonAdd } from "@mui/icons-material";
import IconTextLink from "./not.login.page.component/icon.text.link";

const NotLogin = () => {

    const theme = useTheme();

    return (
        <Container>

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={10}
                mb={3}
            >
                <Lock
                    sx={{
                        fontSize: 80,
                        color: theme.palette.primary.main
                    }}
                />
            </Box>

            <ResponsiveTypography
                customeVariant={{ xs: 'h5', lg: 'h3', }}
                sx={{
                    textAlign: 'center',
                    color: `${theme.palette.secondary.main}`,
                    fontWeight: '600',
                    mt: 5
                }}
            >
                You're Not Logged In
            </ResponsiveTypography>

            <ResponsiveTypography
                customeVariant={{ lg: 'h5', }}
                sx={{
                    textAlign: 'center',
                    margin: '2vh 15vw 7vh 15vw'
                }}
            >
                It looks like you're not logged in.
                To access this page and enjoy our full features,
                please log in to your account.
            </ResponsiveTypography>

            <ResponsiveTypography
                customeVariant={{ xs: 'h6', lg: 'h4', }}
                sx={{
                    textAlign: 'center',
                    color: `${theme.palette.secondary.main}`
                }}
            >
                What can you do?
            </ResponsiveTypography>

            <Box
                display='flex'
                justifyContent='center'
                margin='2vh 15vw 0vh 15vw'
            >


                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        flexWrap: 'wrap',
                    }}
                >

                    <IconTextLink
                        icon={Person}
                        beforeText={""}
                        linkText={"Log in"}
                        afterText={"to your account and continue where you left off."}
                        url={"/login"}>

                    </IconTextLink>

                    <IconTextLink
                        icon={Home}
                        beforeText={"Go back to the"}
                        linkText={"home page"}
                        afterText={"."}
                        url={"/"}>
                    </IconTextLink>

                    <IconTextLink
                        icon={PersonAdd}
                        beforeText={"Don't have an account yet?"}
                        linkText={"Sign Up"}
                        afterText={"now and join us today!"}
                        url={"/login"}>
                    </IconTextLink>

                </Box>
            </Box>
        </Container>

    );
}

export default NotLogin;