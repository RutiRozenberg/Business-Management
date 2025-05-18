import TitlePage from "../../../utils.components/title.page.componenets";
import TitleTypography from "../../../utils.components/title.typography.component";
import BusinessDetailsForm from "./business.page.components/business.details.form";
import HomePageForm from "./business.page.components/home.page.form";


const BusinessAdmin = () => {

    return (
        <>
            <TitlePage title="Business"></TitlePage>

            <TitleTypography title="Your Business"></TitleTypography>

            <BusinessDetailsForm/>

            <HomePageForm/>

            
        </>
    )
}

export default BusinessAdmin;