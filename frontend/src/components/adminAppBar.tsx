import ResponsiveAppBar from "./responsiveAppBar";


const pages = [
    { text: 'Business', url: '/admin' },
    { text: 'Services', url: '/admin/services' }, 
    { text: 'Meetings', url: '/admin/meetings' },
    { text: 'Users', url: '/admin/users' },
];
 
  
const AdminAppBar = () => {
    return (
        <ResponsiveAppBar pages={pages} isAdmin={true}></ResponsiveAppBar>
    )
}

export default AdminAppBar;