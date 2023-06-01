import {
    Backdrop,
    Button,
    ButtonGroup,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { VscAdd, AiFillDelete, FiEdit2 } from 'react-icons/all';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import navigation from '../../../menu-items';
import Breadcrumbs from '../../../components/@extended/Breadcrumbs';
import useToggle from '../../../Hooks/useToggle';
import FormProduct from './FormProduct';

const ListProduct = () => {
    const { state, toggle } = useToggle(false);
    const [form, setForm] = useState(<FormProduct toggle={toggle} />);
    const [currentItem, setItem] = useState(null);
    const delProduct = useMutation({
        mutationFn: (data) => {
            const headers = { Authorization: `Token ${localStorage.getItem('token')}` };
            return axios.delete(`/api/products/${data?.id}/`);
        },
        onSuccess: () => {
            refetch();
        }
    });
    const { data, refetch } = useQuery({
        queryKey: ['cooperative', 'get', 'products'],
        queryFn: () => {
            const headers = { Authorization: `Token ${localStorage.getItem('token')}` };
            return axios.get('/api/cooperative/products/', { headers });
        }
    });
    useEffect(() => {
        if (currentItem) setForm(<FormProduct key={currentItem?.id} toggle={toggle} item={currentItem} />);
        else setForm(<FormProduct toggle={toggle} />);
    }, [currentItem]);
    const handleEdit = (item: any) => {
        setItem(item);
        toggle();
    };
    const handleDelete = (item: any) => {
        delProduct.mutate(item);
    };

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
                          <TableCell align="right">{item?.stock}</TableCell>
                          <TableCell align="right">
                              <ButtonGroup variant="outlined" aria-label="outlined button group">
                                  <IconButton onClick={() => handleEdit(item)}>
                                      <FiEdit2 />
                                  </IconButton>
                                  <IconButton onClick={() => handleDelete(item)}>
                                      <AiFillDelete />
                                  </IconButton>
                              </ButtonGroup>
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
                            <TableCell align="right">Stock</TableCell>
                            <TableCell align="right">
                                <Button
                                    onClick={() => {
                                        setItem(null);
                                        toggle();
                                    }}
                                    variant="contained"
                                    color="success"
                                    startIcon={<VscAdd />}
                                >
                                    Add Product
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{content}</TableBody>
                </Table>
            </TableContainer>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={state}>
                {form}
            </Backdrop>
        </>
    );
};

export default ListProduct;
