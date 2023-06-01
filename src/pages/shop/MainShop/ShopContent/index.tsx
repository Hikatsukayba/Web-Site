import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Divider, Grid, Pagination, Stack, Typography } from '@mui/material';

// project import
import MainCard from '../../../../components/MainCard';
import ComponentSkeleton from '../../../components-overview/ComponentSkeleton';
import SimpleBar from '../../../../components/third-party/SimpleBar';
import CardShop from './CardShop';
import Filters from './FilterContent';
import useFilters from '../../../../Hooks/useFilter';

function ShopContent() {
    const { urlf, setINfo } = useFilters('/api/products/?cooperative__user__is_enabled=true');
    const { data } = useQuery({
        queryKey: ['get', 'list', urlf],
        queryFn: async ({ queryKey }) => {
            return await axios.get(queryKey[2]);
        }
    });
    console.log(data);
    return (
        <ComponentSkeleton>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <MainCard>Products</MainCard>
                </Grid>
                <Grid item xs={2.5}>
                    <MainCard sx={{ overflowY: 'scroll', minHeight: '100vh', maxHeight: '100vh' }}>
                        <SimpleBar
                            sx={{
                                '& .simplebar-content': {
                                    display: 'flex',
                                    flexDirection: 'column'
                                }
                            }}
                        >
                            <Filters setFiler={setINfo} />
                        </SimpleBar>
                    </MainCard>
                </Grid>
                <Grid item xs={9}>
                    <Grid container spacing={3}>
                        {data?.data?.results?.map((item: any) => {
                            return (
                                <Grid key={item?.id} item xs={7} sm={5} md={4} lg={3}>
                                    <CardShop image={item.images[0]?.image} title={item?.title} price={item?.price} rate={item.rate} bio={item.bio} id={item.id} />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </ComponentSkeleton>
    );
}

export default ShopContent;
