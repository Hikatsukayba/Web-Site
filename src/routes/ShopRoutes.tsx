import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';
import MainShop from'../pages/shop/MainShop'


// render - Shop
// const Shop = Loadable(lazy(() => import('../pages/shop/MainShop')));

// render - Product Page
const ProductPage = Loadable(lazy(() => import('../pages/extra-pages/SamplePage')));


// ==============================|| MAIN ROUTING ||============================== //

const ShopRoutes = {
    path: '/Shop',
    element: <MainLayout />,
    children: [
        {
            path: '',
            element: <MainShop />
        },
        // {
        //     path: ':id/::string',
        //     element: <SamplePage />
        // }
    ]
};

export default ShopRoutes;
