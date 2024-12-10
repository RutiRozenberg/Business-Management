import ResponsiveAppBar from "./responsiveAppBar";


const pages = [{ text: 'Business', url: '/business' },{ text: 'Services', url: '/services' }, { text: 'Meetings', url: '/meetings' }];
 
  
const AdminAppBar = () => {
    return (
        <ResponsiveAppBar pages={pages} isAdmin={true}></ResponsiveAppBar>
    )
}

export default AdminAppBar;