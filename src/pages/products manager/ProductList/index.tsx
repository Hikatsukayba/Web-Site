import { Backdrop, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import navigation from '../../../menu-items';
import Breadcrumbs from '../../../components/@extended/Breadcrumbs';
import useToggle from '../../../Hooks/useToggle';
import AddProduct from './FormProduct/AddProduct';

const ListProduct = () => {
    const { state, toggle } = useToggle(false);
    const { data, refetch } = useQuery({
        queryKey: ['cooperative', 'get', 'products'],
        queryFn: () => {
            const headers = { Authorization: `Token ${localStorage.getItem('token')}` };
            return axios.get('/api/cooperative/products/', { headers });
        }
    });
    const content =
        data?.data.length <= 0
            ? 'No products have'
            : data?.data.map((item: any, key: any) => {
                  return (
                      <TableRow key={key}>
                          <TableCell>{item?.id}</TableCell>
                          <TableCell align="right">{item?.title}</TableCell>
                          <TableCell align="right">{item?.id}</TableCell>
                          <TableCell align="right">{item?.price}</TableCell>
                          <TableCell align="right">{item?.rating}</TableCell>
                          <TableCell align="right">{item?.bio}</TableCell>
                          <TableCell align="right">{item?.like}</TableCell>
                          <TableCell align="right">
                              <Button>cdsfsd</Button>
                          </TableCell>
                      </TableRow>
                  );
              });

    return (
        <>
            <Breadcrumbs Handler={toggle} navigation={navigation} title titleBottom card={false} divider={false} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">image</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Rating</TableCell>
                            <TableCell align="right">Bio(%)</TableCell>
                            <TableCell align="right">Likes</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{content}</TableBody>
                </Table>
            </TableContainer>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={state} onClick={toggle}>
                <AddProduct />
            </Backdrop>
        </>
    );
};

export default ListProduct;
