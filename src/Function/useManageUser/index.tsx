import { useContext } from 'react';
import axios from 'axios';
import activationUser from './activation';
import loginUser from './loginUser';
import { Logout } from './logoutUser';
import { UserContext } from '../../Context/userContext';

function useManageUser() {
    const { state, dispatch } = useContext(UserContext);
    const getUser = async () => {
        const headers = await { Authorization: `Token ${findToken()}` };
        return axios
            .get('/auth/users/me/', { headers })
            .then((res) => {
                console.log(res.data);

                if (state.user === null) {
                    dispatch({ type: 'SET_USER', payload: res.data });
                }
                return res.data;
            })
            .catch((err) => {
                console.log(err);
            })
            .finally();
        // Set user in context when it changes
    };
    return { getUser };
}


export default useManageUser;
export { loginUser,  activationUser, Logout };
export const findToken = () => {
    const token = localStorage.getItem('token');
    return token;
};