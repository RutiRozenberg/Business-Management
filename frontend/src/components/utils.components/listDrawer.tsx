import { ExpandMore } from "@mui/icons-material";
import { Box, List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { ResponsiveAppBarObjectProps } from "../responsiveAppBar";
import { useState } from "react";


interface ListDrawerProps {
    pages: ResponsiveAppBarObjectProps[];
    handleCloseNavMenu: (page: ResponsiveAppBarObjectProps) => void;
}

const ListDrawer: React.FC<ListDrawerProps> = ({ pages, handleCloseNavMenu }) => {

    const [openSubNav, setOpenSubNav] = useState<string | null>(null);


    const handleSubNavToggle = (text: string) => {
        setOpenSubNav(openSubNav === text ? null : text);
    };
    
    
    return (
        <Box>
            <Toolbar />

            <List>
                {pages.map((page) => (
                    <Box key={page.text}>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => {
                                if (page.subNav) {
                                    handleSubNavToggle(page.text);
                                } else {
                                    handleCloseNavMenu(page);
                                }
                            }}>
                                <ListItemText primary={page.text} />
                                {page.subNav && (
                                    <ExpandMore sx={{ marginLeft: 'auto', transition: 'transform 0.3s', transform: openSubNav === page.text ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                                )}
                            </ListItemButton>
                        </ListItem>
                        {openSubNav === page.text && page.subNav && (
                            <List component="div" disablePadding sx={{ pl: 2 }}> {/* הזזה לימין */}
                                {page.subNav.map((subPage) => (
                                    <ListItem key={subPage.text} disablePadding>
                                        <ListItemButton onClick={() => handleCloseNavMenu(subPage)}>
                                            <ListItemText primary={subPage.text} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </Box>
                ))}
            </List>

        </Box>
    )
}


export default ListDrawer;