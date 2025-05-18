import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, CircularProgress, Grid, TextField, useTheme } from "@mui/material"
import ResponsiveTypography from "../../../../utils.components/responsive.typography.component";
import GridColumnCenter from "../../../../utils.components/grid.column.center";
import { useEffect, useState } from "react";
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { fetchBusiness } from "../../../../../store/features/business.slice";
import { getAdminToken } from "../../../../../utils/api/token";
import { postData, putData } from "../../../../../utils/api/crud.api";
import { Business } from "../../../../../models/business.model";
import { BusinessDetails } from "../../../../../models/business.details.model";
import { checkValidationErrors } from "../../../../../utils/forms/form.errors";
import { handleChange } from "../../../../../utils/forms/forms.function";


const BusinessDetailsForm = () => {

    const [dataIsLoading, setDataIsLoading] = useState(true);
    const [isCreated, setisCreated] = useState(true);
    const [formIsLoadinf, setFormIsLoadinf] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFaild, setIsfaild] = useState(false);
    const [formData, setFormData] = useState<Business>({
        address: '',
        phone: '',
        email: '',
        name: '',
        _id: ''
    });

    const business = useAppSelector(state => state.business.business);
    const dispatch = useAppDispatch();
    const token = getAdminToken();
    const theme = useTheme();

    const businessSchema = yup.object().shape({
        address: yup.string().required('address is a required field'),
        phone: yup.string()
            .matches(/^(?:\d{9}|\d{10})$/, 'Phone number must be 9 or 10 digits')
            .required('Phone number is a required field'),
        email: yup.string()
            .email('Email address is not valid'),
        name: yup.string()
            .required('Name is a required field'),
    });

    const handleBusiness = async (businessData: Business) => {
        setFormIsLoadinf(true);
        try{
            if(isCreated){
                putData({endpoint: `business/${formData._id}`, data: businessData, token: token || ''})
            } else {
                postData({endpoint: 'business' , data: businessData as BusinessDetails, token: token || ''});
            }
            setIsSuccess(true);
        } catch {
            setIsfaild(true);
        }
        setFormIsLoadinf(false);
    }

    const hundlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();
        setFormIsLoadinf(true);

        const isValidForm: boolean = await checkValidationErrors(businessSchema, formData, setErrors);
        if(isValidForm){
            await handleBusiness(formData);
        }

        setFormIsLoadinf(false);
    }

    useEffect(() => {
        if (!business) {
            dispatch(fetchBusiness());
        }
    }, []);

    useEffect(() => {
        if (business) {
            setFormData(business);
        } else {
            setisCreated(false);
        }
        setDataIsLoading(false);
    }, [dispatch, business]);


    return (
        <>
            <Box
                sx={{
                    m: { xs: '5vh 10vw 4vh 10vw', md: '8vh 15vw 8vh 15vw' },
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
                            Business Details
                        </ResponsiveTypography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {dataIsLoading ? <CircularProgress />
                            :
                            <form onSubmit={hundlesubmit}>
                                <GridColumnCenter spacing="2">


                                    <Grid
                                        item
                                        width={{ xs: 200, md: 339 }}
                                        sx={{
                                            mt: { xs: 2, md: 5 },
                                            p: 0,
                                        }}
                                    >
                                        <TextField
                                            label="Business Name"
                                            type="name"
                                            name="name"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.name}
                                            helperText={errors.name}
                                            onChange={handleChange(setFormData)}
                                            value={formData.name || ''}
                                            multiline
                                        />
                                    </Grid>

                                    <Grid item width={{ xs: 200, md: 339 }} p={0}>
                                        <TextField
                                            label="Email"
                                            type="email"
                                            name="email"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.email}
                                            helperText={errors.email}
                                            onChange={handleChange(setFormData)}
                                            value={formData.email || ''}
                                            multiline
                                        />
                                    </Grid>

                                    <Grid item width={{ xs: 200, md: 339 }} p={0}>
                                        <TextField
                                            label="address"
                                            type="text"
                                            name="address"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.address}
                                            helperText={errors.address}
                                            onChange={handleChange(setFormData)}
                                            value={formData.address || ''}
                                            multiline
                                        />
                                    </Grid>

                                    <Grid item width={{ xs: 200, md: 339 }} p={0}>
                                        <TextField
                                            label="Phone"
                                            type="phone"
                                            name="phone"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.phone}
                                            helperText={errors.phone}
                                            onChange={handleChange(setFormData)}
                                            value={formData.phone || ''}
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
                                            {formIsLoadinf ? <CircularProgress /> : isCreated ? 'update' : 'create'}
                                        </Button>
                                    </Grid>

                                </GridColumnCenter>
                            </form>
                        }
                        
                        {isSuccess && <Alert severity="success" onClose={() => setIsSuccess(false)}>Success</Alert>}
                        {isFaild && <Alert severity="error" onClose={() => setIsfaild(false)}>Faild</Alert>}

                    </AccordionDetails>
                </Accordion>

            </Box>

        </>
    )
}

export default BusinessDetailsForm;