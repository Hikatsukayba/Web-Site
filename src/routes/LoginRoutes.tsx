import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MinimalLayout from '../layout/MinimalLayout';


// render - login
const AuthLogin = Loadable(lazy(() => import('../pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('../pages/authentication/Register')));
const Activation = Loadable(lazy(() => import('../pages/authentication/Activation')));
const Complite = Loadable(lazy(() => import('../pages/authentication/Complite')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'login',
            element: <AuthLogin />
        },
        {
            path: 'register',
            element: <AuthRegister />
        },{
            path:'activate/:uid/:token',
            element:<Activation/>
        },{
            path:'complite',
            element:<Complite/>
        }
    ]
};

export default LoginRoutes;
