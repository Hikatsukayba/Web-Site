import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import {
    Box,
    Button,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    Switch,
    FormGroup,
    FormControlLabel,
    Autocomplete,
    TextField,
    Input
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import FirebaseSocial from './FirebaseSocial';
import AnimateButton from '../../../components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from '../../../utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import useToggle from '../../../Hooks/useToggle';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Ville } from '../../../variables/Data';
import { findToken } from '../../../Function/useManageUser';

// ============================|| FIREBASE - REGISTER ||============================ //

const CompliteCooperative = () => {
    const navigate=useNavigate();
    const registerCooperative = useMutation({
        mutationFn: ({ ice, name,address,description,phone }: any) =>{
            const headers = { Authorization: `Token ${findToken()}` };
            return axios.post('/api/cooperative/', { ice, name,address,description,phone },{headers})},
        onSuccess: () => {
            navigate('/Cooperative/dashboard');
        }
    });

    const handleMouseDownPassword = (event: React.FormEvent) => {
        event.preventDefault();
    };

    return (
        <>
            <Formik
                initialValues={{
                    ice: '',
                    name: '',
                    address: '',
                    image: null,
                    description:'',
                    phone:'',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    ice: Yup.number().min(0).max(9999).required(),
                    name: Yup.string().max(255).required('name is required'),
                    // image: Yup.array()
                    //     .min(1, 'Please select at least one image')
                    //     .max(5, 'You can upload up to 5 images')
                    //     .required('Please select at least one image'),
                    address: Yup.string().required('Please select a value'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
                        registerCooperative.mutate(values);
                    } catch (err: any) {
                        console.error(err);
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="ice-signup">Ice*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.name && errors.name)}
                                        id="ice-login"
                                        type="number"
                                        value={values.ice}
                                        name="ice"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="4523"
                                        inputProps={{}}
                                    />
                                    {touched.ice && errors.ice && (
                                        <FormHelperText error id="helper-text-ice-signup">
                                            {errors.ice}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="name-signup">Name of Cooperative*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.name && errors.name)}
                                        id="name-login"
                                        type="text"
                                        value={values.name}
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Name"
                                        inputProps={{}}
                                    />
                                    {touched.name && errors.name && (
                                        <FormHelperText error id="helper-text-name-signup">
                                            {errors.name}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="phone-signup">Phone*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.phone && errors.phone)}
                                        id="phone-login"
                                        type="text"
                                        value={values.phone}
                                        name="phone"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="+212 663-52545"
                                        inputProps={{}}
                                    />
                                    {touched.phone && errors.phone && (
                                        <FormHelperText error id="helper-text-phone-signup">
                                            {errors.phone}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="address-signup">Address*</InputLabel>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={Ville}
                                        componentName="address"
                                        onBlur={handleBlur}
                                        onChange={(e: any,v:string) => {
                                            setFieldValue('address', v);
                                        }}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Ville" />}
                                    />
                                    {touched.address && errors.address && (
                                        <FormHelperText error id="helper-text-address-signup">
                                            {errors.address}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="description-signup">Description*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.description && errors.description)}
                                        id="description-login"
                                        type="text"
                                        multiline={true}
                                        sx={{minHeight:100}}
                                        value={values.description}
                                        name="description"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Description....."
                                        inputProps={{}}
                                    />
                                    {touched.description && errors.description && (
                                        <FormHelperText error id="helper-text-ice-signup">
                                            {errors.description}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-signup">Images</InputLabel>
                                    <Input
                                        type="file"
                                        name="image"
                                        inputProps={{ accept: 'image/*', multiple: true }}
                                        onChange={(event: any) => {
                                            const files = event.currentTarget?.files;
                                            const formData = new FormData();
                                            for (let i = 0; i < files.length; i++) {
                                                formData.append('image', files[i]);
                                            }
                                            setFieldValue('image', formData);
                                        }}
                                    />
                                    {errors.image && touched.image && <div>{errors.image}</div>}
                                </Stack>
                            </Grid>

                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Create Cooperative
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default CompliteCooperative;
