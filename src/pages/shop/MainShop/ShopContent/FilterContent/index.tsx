import { Box, List, ListItem, Stack, TextField, Typography } from '@mui/material';
import FilterGroup from './FilterGroup';

function Filters({setFiler}: any) {
    return (
        <>
            <FilterGroup title={'Price Range'}>
                <ListItem>
                    <Stack direction={'row'} spacing={0.5}>
                        <TextField
                            id="outlined-number"
                            placeholder='0'
                            name='price_gt'
                            type="number"
                            onChange={(e)=>setFiler(e.currentTarget.name,e.currentTarget.value)}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                        <Typography variant='h3'>-</Typography>
                        <TextField
                            id="outlined-number"
                            type="number"
                            name='price_lt'
                            placeholder='2500'
                            onChange={(e)=>setFiler(e.currentTarget.name,e.currentTarget.value)}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Stack>
                </ListItem>
            </FilterGroup>
            <FilterGroup title={'Date Range'}>
                <ListItem>
                    <Stack direction={'row'} spacing={0.5}>
                        <TextField
                            id="outlined-number"
                            placeholder='0'
                            name='date_created_after'
                            type="number"
                            onChange={(e)=>setFiler(e.currentTarget.name,e.currentTarget.value)}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                        <Typography variant='h3'>-</Typography>
                        <TextField
                            id="outlined-number"
                            type="number"
                            name='date_created_before'
                            placeholder='2500'
                            onChange={(e)=>setFiler(e.currentTarget.name,e.currentTarget.value)}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Stack>
                </ListItem>
            </FilterGroup>
        </>
    );
}

export default Filters;
