// material-ui
import { Box, IconButton, Link, useMediaQuery } from '@mui/material';
import { GithubOutlined } from '@ant-design/icons';

// project import
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';
import Navigation from './Navigation';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
    const matchesXs = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

    return (
        <>
            {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

            {!matchesXs && <Navigation />}
            {!matchesXs && <Search />}

            <Notification />
            {!matchesXs && <Profile />}
            {matchesXs && <MobileSection />}
        </>
    );
};

export default HeaderContent;
