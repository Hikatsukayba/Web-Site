import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar, useMediaQuery } from '@mui/material';

// project import
import Header from './Header';
import navigation from '../../../menu-items';
import Breadcrumbs from '../../../components/@extended/Breadcrumbs';

// types
import { openDrawer } from '../../../store/menu';

// ==============================|| MAIN LAYOUT ||============================== //
const GuestLayout = ({ children }: any) => {
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Header />
            <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                <Toolbar />
                <Breadcrumbs navigation={navigation} title titleBottom card={false} divider={false} />
                {children}
            </Box>
        </Box>
    );
};

export default GuestLayout;
