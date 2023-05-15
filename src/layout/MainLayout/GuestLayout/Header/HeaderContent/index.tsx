// material-ui
import { Box, IconButton, Link, useMediaQuery,Button } from '@mui/material';
import { GithubOutlined } from '@ant-design/icons';

// project import
import Search from './Search';
import Notification from './Notification';
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
            <Button>Login</Button>
            
        </>
    );
};

export default HeaderContent;
