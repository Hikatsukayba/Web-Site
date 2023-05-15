import { Box, Stack } from '@mui/material';
import { string } from 'prop-types';
import { useState } from 'react';

function ImgContainer({ imgArray }: any) {
    const [currentImg, setImage] = useState(imgArray[0]);
    return <Stack direction={'column'}>
        <Box width={600}><img src={`http://127.0.0.1:8000/${currentImg}`} /></Box>
        <Stack direction={'row'}><img src={`http://127.0.0.1:8000/${currentImg}`} /></Stack>
    </Stack>;
}

export default ImgContainer;
