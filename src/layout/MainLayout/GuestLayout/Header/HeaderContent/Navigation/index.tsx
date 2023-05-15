//project import
import Logo from '../../../../../../components/Logo';
import menuItem from '../../../../../../menu-items';

//import material-ui
import Box from '@mui/material/Box';
import NavItem from './NavItems';
import List from '@mui/material/List';

function Navigation() {
    const navGroups = menuItem.items[4].map((item:any,key: any) => {
        return <NavItem key={item.id} item={item} />;
    });
    const logo = {
        width: 100,
        marginRight: 20,
        img: {
            width: 125
        }
    };
    return (
        <Box {...boxStyl}>
            <Logo sx={logo} />
            <List sx={{display:'flex',flexDirection:'row',marginY:0,paddingY:0}}>{navGroups}</List>
        </Box>
    );
}

const boxStyl = {
    display: 'flex',
    justifyItems: 'center',
    alignItems: 'center',
    paddingLeft: 4
};

export default Navigation;
