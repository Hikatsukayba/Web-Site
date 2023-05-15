// project import
import CooperativeLayout from './CooperativeLayout';
import CustomerLayout from './CustomerLoyout';
import GuestLayout from './GuestLayout';
import { UserContext } from '../../Context/userContext';

//import from react-router-dom
import { Outlet } from 'react-router-dom';

//import from react
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { setUser } from '../../store/user';

function MainLayout() {
    const { user } = useSelector((state: any) => state?.user);
    const dispatch = useDispatch();
    const {} = useQuery({
        queryKey: ['user', 'get'],
        queryFn: () => {
            const headers = { Authorization: `Token ${localStorage.getItem('token')}` };
            return axios.get('/auth/users/me/', { headers }).then((res) => {
                dispatch(setUser(res.data));
            });
        }
    });
    if (user) {
        if (user.is_cooperative)
            return (
                <CooperativeLayout>
                    <Outlet />
                </CooperativeLayout>
            );
        else if (!user.is_cooperative)
            return (
                <CustomerLayout>
                    <Outlet />
                </CustomerLayout>
            );
    }
    return (
        <GuestLayout>
            <Outlet />
        </GuestLayout>
    );
}

export default MainLayout;
