import React from 'react';
import { pages } from './Items';
import { Button, Box, MenuItem, Typography } from '@mui/material';
import About from '../../About';
import ThemeSwitch from '../ThemeSwitch';
import { Link } from '@inertiajs/react';
import '../../../../scss/AppBar.scss';

/** MUI Navbar Items */
export const LGNavbarItems = (props: any) => {
    const isActive = (link: string): boolean => window.location.href === link;

    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((item, index) => (
                window.route('sales.create') != window.location.href ?
                    <Link href={item?.link} key={index} style={{ color: 'inherit', textDecoration: 'none' }}>
                        <Button sx={{ my: 2, color: 'inherit', display: 'block' }} className={(isActive(item?.link)) ? 'active' : ''} >{item?.name}</Button>
                    </Link> :
                    <Button sx={{ my: 2, color: 'inherit', display: 'block' }} disabled key={index}>{item?.name}</Button>
            ))}

            <About type='lg' app={props.app} />
        </Box>)
}


/** MUI Mobile Navbar Items */
export const MobileNavbarItems = (props: any) => {
    const handleClick = (link: string) => {
        props.handleCloseNavMenu();
        window.router.visit(link);
    }

    return (<>
        {pages.map((item, index) => (
            <MenuItem key={index} onClick={() => handleClick(item?.link)} disabled={window.location.href == window.route('sales.create')}>
                <Typography textAlign={'center'}>{item?.name}</Typography>
            </MenuItem>
        ))}

        <About type='mobile' handleCloseNavMenu={props?.handleCloseNavMenu} app={props?.app} />
        <MenuItem><ThemeSwitch /></MenuItem>
    </>);
}