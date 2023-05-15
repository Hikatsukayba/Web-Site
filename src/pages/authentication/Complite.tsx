import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';
import CompliteCooperative from './auth-forms/CompliteCooperative';
import CompliteCustomer from './auth-forms/CompliteCustomer';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

// ================================|| LOGIN ||================================ //

const Complite = () => {
    const { user } = useSelector((state: any) => state.user);
    const navigate = useNavigate();
    const cmp = user.is_cooperative ? <CompliteCooperative /> : <CompliteCustomer />;
    useEffect(() => {
        if (user.information) {
            navigate('/');
        }
    }, []);
    return (
        <AuthWrapper>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                        <Typography variant="h3">Complite Registring</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    {cmp}
                </Grid>
            </Grid>
        </AuthWrapper>
    );
};

export default Complite;
