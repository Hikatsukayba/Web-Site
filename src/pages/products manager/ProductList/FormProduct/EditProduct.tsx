import React, { useEffect, useState } from 'react';
import MainCard from '../../../../components/MainCard';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Autocomplete, Button, ButtonGroup, FormHelperText, Grid, OutlinedInput, Stack, TextField, Typography } from '@mui/material';
import AnimateButton from '../../../../components/@extended/AnimateButton';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ImageUpload from '../../../../components/FileUploder';

const EditProduct = ({ items, toggles }: any) => {
    const { data, refetch } = useQuery({
        queryKey: ['get', 'categorery'],
        queryFn: () => {
            return axios.get('/api/category/');
        }
    });
    const Addproduct = useMutation({
        mutationFn: (data: any) => {
            const headers = { Authorization: `Token ${localStorage.getItem('token')}` };
            return axios.post('/api/products/s/AddProduct/', data, { headers });
        },
        onSuccess: () => {
            refetch();
            toggles();
        }
    });
    const cate = data?.data;
    const [values, setValue] = useState({
        title: items?.title,
        cat: items?.cat,
        sub: items?.sub,
        stock: items?.stock,
        description: items?.description,
        price: items?.price,
        bio: items?.bio,
        image: items?.image,
        submit: null
    });
    const handleClose = () => {
        toggles();
        setValue({
            title: '',
            cat: null,
            sub: [],
            stock: 0,
            description: '',
            price: 0.0,
            bio: 0.0,
            image: [],
            submit: null
        });
    };
    return (
        <MainCard
            sx={{
                maxWidth: { xs: 1000, lg: 1300 },
                minWidth: { xs: 1000, lg: 1200 },
                maxHeight: { xs: 400, lg: 600 },
                minHeight: { xs: 400, lg: 590 },
                margin: { xs: 2.5, md: 3 },
                '& > *': {
                    flexGrow: 1,
                    flexBasis: '50%'
                },
                overflow: 'scroll'
            }}
            content={false}
            border={false}
            boxShadow
            shadow={(theme: any) => theme.customShadows.z1}
        >
            <Formik
                initialValues={values}
                validationSchema={Yup.object().shape({
                    // title: Yup.string().required(),
                    // // sub: ,
                    // stock: Yup.number().integer().required(),
                    // description: Yup.string().required(''),
                    // price: Yup.number()
                    //     .test('is-decimal', 'invalid decimal', (value) => (value + '').match(/^\d*\.{1}\d*$/))
                    //     .required('Enter The Price'),
                    // bio: Yup.number().test('is-decimal', 'invalid decimal', (value) => (value + '').match(/^\d*\.{1}\d*$/))
                    // // images: [],
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const data = new FormData();

                        Object.entries(values).forEach((item) => {
                            data.append(item[0], item[1]);
                        });
                        console.log(values.sub);
                        values.image?.forEach((element:any) => {
                            data.append('image', element);
                        });
                        Addproduct.mutate(data);

                        setStatus({ success: false });
                        setSubmitting(false);
                    } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3} sx={{ padding: 8 }}>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <Typography variant="subtitle1">Title*</Typography>
                                    <OutlinedInput
                                        id="title-login"
                                        type="text"
                                        value={values.title}
                                        name="title"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter Title"
                                        fullWidth
                                        error={Boolean(touched.title && errors.title)}
                                    />
                                    {touched.title && errors.title && (
                                        <FormHelperText error id="standard-weight-helper-text-title-form-product">
                                            {errors.title}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <Typography variant="subtitle1">Price*</Typography>

                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.price && errors.price)}
                                        id="-price-login"
                                        type={'number'}
                                        value={values.price}
                                        name="price"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter price"
                                    />
                                    {touched.price && errors.price && (
                                        <FormHelperText error id="standard-weight-helper-text-price-login">
                                            {errors.price}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <Typography variant="subtitle1">Stock*</Typography>

                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.stock && errors.stock)}
                                        id="-stock-login"
                                        type={'number'}
                                        value={values.stock}
                                        name="stock"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter stock"
                                    />
                                    {touched.stock && errors.stock && (
                                        <FormHelperText error id="standard-weight-helper-text-stock-login">
                                            {errors.stock}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <Typography variant="subtitle1">Bio*</Typography>
                                    <OutlinedInput
                                        id="title-login"
                                        type="number"
                                        value={values.bio}
                                        name="bio"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter Title"
                                        fullWidth
                                        error={Boolean(touched.bio && errors.bio)}
                                    />
                                    {touched.bio && errors.bio && (
                                        <FormHelperText error id="standard-weight-helper-text-bio-form-product">
                                            {errors?.bio}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            {cate && (
                                <Grid item xs={6}>
                                    <Stack spacing={1}>
                                        <Typography variant="subtitle1">Category*</Typography>
                                        <Autocomplete
                                            id="tags-outlined"
                                            options={cate}
                                            getOptionLabel={(option) => option?.name}
                                            value={values.cat}
                                            onChange={(event, value) => setFieldValue('cat', value?.id)}
                                            filterSelectedOptions
                                            renderInput={(params) => <TextField {...params} label="Category" placeholder="Favorites" />}
                                        />
                                    </Stack>
                                </Grid>
                            )}

                            {cate && (
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1">Subcategory*</Typography>
                                    <Autocomplete
                                        id="tags-outlined"
                                        options={cate}
                                        multiple
                                        value={values.sub}
                                        getOptionLabel={(option) => option?.name}
                                        onChange={(event, v) => setFieldValue('sub', JSON.stringify(v))}
                                        filterSelectedOptions
                                        renderInput={(params) => <TextField {...params} label="Category" placeholder="Favorites" />}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <ImageUpload name="image" />
                            </Grid>
                            <Grid item xs={12} sx={{ mt: -1 }}>
                                <Stack spacing={1}>
                                    <Typography variant="subtitle1">Description*</Typography>
                                    <TextField
                                        value={values.description}
                                        name="description"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        multiline
                                        rows={4}
                                        maxRows={5}
                                        fullWidth
                                    />
                                    {touched.description && errors.description && (
                                        <FormHelperText error id="standard-weight-helper-text-description-form-product">
                                            {errors?.description}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}

                            <Grid item xs={12}>
                                <ButtonGroup>
                                    <AnimateButton>
                                        <Button
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Update
                                        </Button>
                                    </AnimateButton>
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            fullWidth
                                            size="large"
                                            variant="outlined"
                                            color="primary"
                                            onClick={handleClose}
                                        >
                                            Close
                                        </Button>
                                    </AnimateButton>
                                </ButtonGroup>
                            </Grid>
                            <Grid item xs={12}></Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </MainCard>
    );
};

export default EditProduct;
