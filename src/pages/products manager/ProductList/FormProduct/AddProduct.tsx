import React from 'react';
import MainCard from '../../../../components/MainCard';
import * as Yup from 'yup';
import { Formik } from 'formik';

const AddProduct = () => {
    const string =
        '{"id": 1,"subcategory": [],"title": "sdcxvxc","stock": 0,"description": "sdvvdvdf","price": "12.50","bio": 12.0,"images": [],"rating": 0.0,"like": 0,"reviews": [],"date_created": "2023-05-03T17:01:12.223026Z"}';
    console.log(JSON.parse(string));
    return (
        <MainCard
            sx={{
                maxWidth: { xs: 400, lg: 475 },
                margin: { xs: 2.5, md: 3 },
                '& > *': {
                    flexGrow: 1,
                    flexBasis: '50%'
                }
            }}
            content={false}
            border={false}
            boxShadow
            shadow={(theme: any) => theme.customShadows.z1}
        >
            <Formik
                initialValues={{
                    title: '',
                    cat: null,
                    sub: [],
                    stock: 0,
                    description: '',
                    price: 0,
                    bio: 0,
                    images: [],
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    title: Yup.string().required(),
                    // sub: ,
                    stock: Yup.number().integer().required(),
                    description: Yup.string().required(''),
                    price: Yup.number().test('is-decimal', 'invalid decimal', (value) => (value + '').match(/^\d*\.{1}\d*$/)).required('Enter The Price'),
                    bio: Yup.number().test('is-decimal', 'invalid decimal', (value) => (value + '').match(/^\d*\.{1}\d*$/))
                    // images: [],
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
                    } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>

                    </form>
                )}
            </Formik>
        </MainCard>
    );
};

export default AddProduct;
