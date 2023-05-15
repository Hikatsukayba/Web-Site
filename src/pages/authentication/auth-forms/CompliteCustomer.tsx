import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

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
import { Gender, Ville } from '../../../variables/Data';

// ============================|| FIREBASE - REGISTER ||============================ //

const CompliteCustomer = () => {
    const registerUser = useMutation({
        mutationFn: ({ last_name, email, password, re_password, is_cooperative }: any) =>
            axios.post('/auth/users/', { last_name, email, password, re_password, is_cooperative }),
        onSuccess: () => {
            console.log('success amd emal validation has send');
        }
    });

    const handleMouseDownPassword = (event: React.FormEvent) => {
        event.preventDefault();
    };

    return (
        <>
            <Formik
                initialValues={{
                    first_name: '',
                    last_name: '',
                    gender: '',
                    image: null,
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    first_name: Yup.string().required(),
                    last_name: Yup.string().max(255).required('last_name is required'),
                    // image: Yup.array()
                    //     .min(1, 'Please select at least one image')
                    //     .max(5, 'You can upload up to 5 images')
                    //     .required('Please select at least one image'),
                    gender: Yup.string().required('Please select a value'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
                        console.log(values);
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
                                    <InputLabel htmlFor="first_name-signup">First Name*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.last_name && errors.last_name)}
                                        id="first_name-login"
                                        type="text"
                                        value={values.first_name}
                                        name="first_name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="First Name..."
                                        inputProps={{}}
                                    />
                                    {touched.first_name && errors.first_name && (
                                        <FormHelperText error id="helper-text-first_name-signup">
                                            {errors.first_name}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="last_name-signup">Last Name*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.last_name && errors.last_name)}
                                        id="last_name-login"
                                        type="text"
                                        value={values.last_name}
                                        name="last_name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Last Name"
                                        inputProps={{}}
                                    />
                                    {touched.last_name && errors.last_name && (
                                        <FormHelperText error id="helper-text-last_name-signup">
                                            {errors.last_name}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="gender-signup">Gender*</InputLabel>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={Gender}
                                        componentName="gender"
                                        onBlur={handleBlur}
                                        onChange={(e: any,v:string) => {
                                            setFieldValue('gender', v[0]);
                                        }}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Gender" />}
                                    />
                                    {touched.gender && errors.gender && (
                                        <FormHelperText error id="helper-text-gender-signup">
                                            {errors.gender}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-signup">Image</InputLabel>
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

export default CompliteCustomer;
