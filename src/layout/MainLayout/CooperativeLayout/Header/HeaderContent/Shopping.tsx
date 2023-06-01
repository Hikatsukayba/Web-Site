import { useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Badge,
    Box,
    ClickAwayListener,
    Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Paper,
    Popper,
    Typography,
    useMediaQuery
} from '@mui/material';

// project import
import MainCard from '../../../../../components/MainCard';
import Transitions from '../../../../../components/@extended/Transitions';

// assets
import { BellOutlined, CloseOutlined, GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import Search from './Search';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// sx styles
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

const actionSX = {
    mt: '6px',
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',

    transform: 'none'
};

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const Notification = () => {
    const { data } = useQuery({
        queryKey: ['get', 'items cart'],
        queryFn: () => {
            let cart_id = localStorage.getItem('cart-id');
            if (cart_id === null) {
                axios.post('/api/shoppingcarts/').then((res) => localStorage.setItem('cart-id', res.data?.id));
                cart_id = localStorage.getItem('cart-id');
            }
            return axios.get(`/api/shoppingcarts/${cart_id}/items/`);
        }
    });
    const content = data?.data.map((item) => {
        return (
            <>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar
                            sx={{
                                color: 'success.main',
                                bgcolor: 'success.lighter'
                            }}
                            src={`http://127.0.0.1:8000${item.product.images[0]?.image}`}
                          
                        />
                            
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography component="span" variant="caption">
                                {item?.product.title}
                            </Typography>
                        }
                        secondary={item?.product.price*item?.quantity}
                    />
                    <ListItemSecondaryAction>
                        <Typography variant="subtitle1"  noWrap>
                            {item?.quantity}
                        </Typography>
                    </ListItemSecondaryAction>
                </ListItemButton>
                <Divider />
            </>
        );
    });
    console.log(content);
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: any) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const iconBackColorOpen = 'grey.300';
    const iconBackColor = 'grey.100';

    return (
        <>
            <Box sx={{ flexShrink: 0, ml: 0.75 }}>
                <IconButton
                    disableRipple
                    color="secondary"
                    sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
                    aria-label="open profile"
                    ref={anchorRef}
                    aria-controls={open ? 'profile-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <Badge badgeContent={4} color="primary">
                        <BellOutlined />
                    </Badge>
                </IconButton>
                <Popper
                    placement={matchesXs ? 'bottom' : 'bottom-end'}
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                    popperOptions={{
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [matchesXs ? -5 : 0, 9]
                                }
                            }
                        ]
                    }}
                >
                    {({ TransitionProps }: any) => (
                        <Transitions type="fade" in={open} {...TransitionProps}>
                            <Paper
                                sx={{
                                    boxShadow: theme?.customShadows?.z1,
                                    width: '100%',
                                    minWidth: 285,
                                    maxWidth: 420,
                                    [theme.breakpoints.down('md')]: {
                                        maxWidth: 285
                                    }
                                }}
                            >
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MainCard
                                        title="Shopping Cart"
                                        elevation={0}
                                        border={false}
                                        content={false}
                                        secondary={
                                            <IconButton size="small" onClick={handleToggle}>
                                                <CloseOutlined />
                                            </IconButton>
                                        }
                                    >
                                        <List
                                            component="nav"
                                            sx={{
                                                p: 0,
                                                '& .MuiListItemButton-root': {
                                                    py: 0.5,
                                                    '& .MuiAvatar-root': avatarSX,
                                                    '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                                                }
                                            }}
                                        >
                                            {content}
                                            <Divider />
                                        </List>
                                    </MainCard>
                                </ClickAwayListener>
                            </Paper>
                        </Transitions>
                    )}
                </Popper>
            </Box>
        </>
    );
};

export default Notification;
