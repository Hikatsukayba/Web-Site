import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import { useContext } from 'react';
import { UserContext } from '../Context/userContext';
import ShopRoutes from './ShopRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const {state}=useContext(UserContext);
    let Routes=[];
    if(state.user === null)Routes.push(LoginRoutes);
    Routes.push(ShopRoutes)
    Routes.push(MainRoutes)
    return useRoutes(Routes);
}
