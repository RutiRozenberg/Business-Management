import ResponsiveAppBar from "./responsiveAppBar";


const pages = [{ text: 'Home', url: '/' },{ text: 'Services', url: '/services' }, { text: 'Meetings', url: '/meetings' }];
 
  
const UserAppBar = () => {
    return (
        <ResponsiveAppBar pages={pages} isAdmin={false}></ResponsiveAppBar>
    )
}

export default UserAppBar;