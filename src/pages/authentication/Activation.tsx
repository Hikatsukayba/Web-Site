import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Activation() {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    const activUser = useMutation({
        mutationFn: (data: any) => {
            return axios.post('/auth/users/activation/', data);
        },
        onSuccess: () => {
            navigate('/login');
        }
    });
    useEffect(() => {
        activUser.mutate({ uid, token });
    }, []);

    return <h1>asdas</h1>;
}

export default Activation;
