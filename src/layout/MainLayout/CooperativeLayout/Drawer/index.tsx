import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { Box, Drawer, useMediaQuery } from '@mui/material';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';

// project import

import DrawerContent from './DrawerContent';
import MiniDrawerStyled from './MiniDrawerStyled';
import { drawerWidth } from '../../../../config';

// ==============================|| MAIN LAYOUT - DRAWER ||============================== //

const MainDrawer = ({ open = true, handleDrawerToggle, window }: any) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    // responsive drawer container
    const container = window !== undefined ? () => window().document.body : undefined;

    // header content
    const drawerContent = useMemo(() => <DrawerContent />, []);

    const closedMixin = (theme: Theme): CSSObject => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`
        }
    });

    return (
        <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: (theme) => theme.zIndex.drawer + 1 }} aria-label="mailbox folders">
            {!matchDownMD ? (
                <MiniDrawerStyled variant="permanent" open={open}>
                    {drawerContent}
                </MiniDrawerStyled>
            ) : (
                <Drawer
                    container={container}
                    variant="temporary"
                    open={open}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', lg: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            borderRight: `1px solid ${theme.palette.divider}`,
                            backgroundImage: 'none',
                            boxShadow: 'inherit'
                        }
                    }}
                >
                    {open && drawerContent}
                </Drawer>
            )}
        </Box>
    );
};

MainDrawer.propTypes = {
    open: PropTypes.bool,
    handleDrawerToggle: PropTypes.func,
    window: PropTypes.object
};

export default MainDrawer;