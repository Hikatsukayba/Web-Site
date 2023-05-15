import axios from 'axios';

export const Logout = () => {
    const headers={Authentication:`Token ${localStorage.getItem('token')}`}
    return axios.post('/auth-base/token/logout/',{headers}).then(() => {
        localStorage.setItem('token', '');
        localStorage.setItem('cart-id', '');
    });
};
