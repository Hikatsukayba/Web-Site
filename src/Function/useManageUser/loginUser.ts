import axios from 'axios';

const loginUser = (data: any) => {
    return axios.get('/auth-base/token/login/', data);
};
export default loginUser;
