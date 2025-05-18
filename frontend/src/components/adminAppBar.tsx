import ResponsiveAppBar from "./responsiveAppBar";

export const meetingPages = [
    { text: 'Your Meetings', url: '/admin/meetings' },
    { text: 'Times', url: '/admin/meetings/times' }
]

const pages = [
    { text: 'Business', url: '/admin' },
    { text: 'Services', url: '/admin/services' }, 
    { text: 'Meetings', url: '/admin/meetings', subNav: meetingPages },
    { text: 'Users', url: '/admin/users' },
    { text: 'Messages', url: '/admin/messages'}
];
 
  
const AdminAppBar = () => {
    return (
        <ResponsiveAppBar pages={pages} isAdmin={true}></ResponsiveAppBar>
    )
}

export default AdminAppBar;