import axios from 'axios';

const activationUser = (data: any) => {
    return axios.post('/auth/users/activation/', data);
};
export default activationUser;
