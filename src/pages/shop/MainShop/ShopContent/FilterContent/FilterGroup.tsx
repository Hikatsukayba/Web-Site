import { Box, List, Typography } from '@mui/material';

function FilterGroup(item: any) {
    return (
        <List
            subheader={
                <Box sx={{ pl: 0.5, mb: 1.5 }}>
                    <Typography variant="subtitle1" fontSize={16.5} color="textSecondary">
                        {item.title}
                    </Typography>
                    {/* only available in paid version */}
                </Box>
            }
            sx={{ mb: 1.5, py: 0, zIndex: 0 }}
        >
            {item.children}
        </List>
    );
}

export default FilterGroup;
