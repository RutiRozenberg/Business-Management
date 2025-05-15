import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, CircularProgress, Grid, TextField, useTheme } from "@mui/material"
import ResponsiveTypography from "../../../../utils.components/responsiveTypography.component";
import GridColumnCenter from "../../../../utils.components/gridColumnCenter";
import { useEffect, useState } from "react";
import * as yup from 'yup';
import { getDataById, postData, putData } from "../../../../../utils/api/crud.api";
import { Homepage } from "../../../../../models/homepage.model";
import { getAdminToken } from "../../../../../utils/api/token";
import { HomepageDetails } from "../../../../../models/homepage.details.model";
import { checkValidationErrors } from "../../../../../utils/forms/form.errors";


const HomePageForm = () => {

    const [getLoading, setGetLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isCreted, setisCreated] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFaild, setIsfaild] = useState(false);
    const [formData, setFormData] = useState<Homepage>({
        about: '',
        contact: '',
        _id: '',
    });

    const token = getAdminToken();

    const theme = useTheme();

    const homePageSchema = yup.object().shape({
        about: yup.string(),
        conact: yup.string(),
    });



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleHomePage = async (homePageData: Homepage) => {
        setIsLoading(true);
        try {
            if(isCreted){
                await putData({endpoint: `homepage/${formData._id}` , data: homePageData, token: token || ''})
            } else { 
                await postData({endpoint: 'homepage' , data: homePageData as HomepageDetails, token: token || ''});
            }
            setIsSuccess(true);
        } catch {
            setIsfaild(true);
        }
        setIsLoading(false);

    }

    const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const isValidForm: boolean = await checkValidationErrors(homePageSchema, formData, setErrors);
        if(isValidForm){
            await handleHomePage(formData);
        }
        
        setIsLoading(false);
    }

    const fetchHomePageData = async () => {
        const homePageData: Homepage | null = await getDataById({ endpoint: 'homepage' });
        if (!homePageData) {
            setisCreated(false);
        } else {
            setFormData(homePageData);
        }
        setGetLoading(false);
    }
    useEffect(() => {
        fetchHomePageData();
    }, []);

    return (
        <>
            <Box
                sx={{
                    m: { xs: '2vh 10vw', md: '2vh 15vw' },
                }}
            >

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                    >
                        <ResponsiveTypography
                            customeVariant={{
                                xs: "h6",
                                md: "h5",
                            }}
                            color={theme.palette.primary.dark}
                            fontWeight={700}
                        >
                            Home Page Details
                        </ResponsiveTypography>
                    </AccordionSummary>
                    <AccordionDetails>

                        {getLoading ? <CircularProgress />
                            : <form onSubmit={handlesubmit}>
                                <GridColumnCenter spacing="2">

                                    <Grid
                                        item
                                        width={{ xs: 200, md: 339 }}
                                        sx={{
                                            mt: 2,
                                            p: 0,
                                        }}
                                    >
                                        <TextField
                                            label="About"
                                            type="about"
                                            name="about"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.about}
                                            helperText={errors.about}
                                            onChange={handleChange}
                                            value={formData.about || ''}
                                            multiline
                                        />
                                    </Grid>

                                    <Grid item width={{ xs: 200, md: 339 }} p={0}>
                                        <TextField
                                            label="Contact"
                                            type="contact"
                                            name="contact"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.contact}
                                            helperText={errors.contact}
                                            onChange={handleChange}
                                            value={formData.contact || ''}
                                            multiline
                                        />
                                    </Grid>

                                    <Grid
                                        item
                                        width={{ xs: 200, md: 339 }}
                                        m={3}
                                        p={0}
                                    >
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                        >
                                            {isLoading ? <CircularProgress /> : isCreted ? 'update' : 'Create'}
                                        </Button>
                                    </Grid>

                                </GridColumnCenter>
                            </form>}

                            {isSuccess && <Alert severity="success" onClose={() => setIsSuccess(false)}>Success</Alert>}
                            {isFaild && <Alert severity="error" onClose={() => setIsfaild(false)}>Faild</Alert>}

                    </AccordionDetails>
                </Accordion>

            </Box>
        </>
    )
}

export default HomePageForm;