// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
    id: 'PM1',
    title: 'Product Managment',
    type: 'group',
    children: [
        {
            id: 'pro1',
            title: 'Product',
            type: 'item',
            url: '/Cooperative/product',
            icon: icons.LoginOutlined,
            // target: true
        },
        {
            id: 'or1',
            title: 'orders',
            type: 'item',
            url: '/Cooperative/orders',
            icon: icons.ProfileOutlined,
            // target: true
        }
    ]
};

export default pages;
