import React, { useEffect, useState } from 'react';
import AddProduct from './AddProduct';
import { Box } from '@mui/material';
import EditProduct from './EditProduct';

const FormProduct = ({ toggle, item }: any) => {
    const [content, setContent] = useState(<AddProduct toggles={toggle} />);
    console.log(content);
    useEffect(() => {
        if (item) setContent(<EditProduct items={item} toggles={toggle} />);
        else setContent(<AddProduct toggles={toggle} />);
    }, [item]);
    const handleAdd = (item: any) => {
        toggle();
    };
    return <Box>{content}</Box>;
};

export default FormProduct;
