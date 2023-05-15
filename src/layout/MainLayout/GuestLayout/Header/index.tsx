import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { AppBar, IconButton, Toolbar, styled, useMediaQuery } from '@mui/material';

// project import
import AppBarStyled from './AppBarStyled';
import HeaderContent from './HeaderContent';

// assets
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

const Header = ({ open, handleDrawerToggle }:any) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    const iconBackColor = 'grey.100';
    const iconBackColorOpen = 'grey.200';

    // common header
    const mainHeader = (
        <Toolbar>
            <HeaderContent />
        </Toolbar>
    );

    // app-bar params
    const AppBarStyled = styled(AppBar)(({ theme}) => ({
        position: 'fixed',
        color: 'inherit',
        backgroundColor:'white',
        elevation: 0,
        zIndex:1800,
        sx: {
            borderBottom: `0.5rem solid ${theme.palette.divider}`
            // boxShadow: theme.customShadows.z1
        }
    }));

    return (
        <>
                <AppBarStyled >{mainHeader}</AppBarStyled>
            {/* {!matchDownMD ? (
                // <AppBarStyled open={open} {...appBar}>
                //     {mainHeader}
                // </AppBarStyled>
            ) : (
            )} */}
        </>
    );
};

Header.propTypes = {
    open: PropTypes.bool,
    handleDrawerToggle: PropTypes.func
};

export default Header;
