import React from 'react'
import { ColorModeContext } from '../MDLayout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';
import { FormControlLabel, Switch } from '@mui/material';

const ThemeSwitch = (props) => {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    return (
        <FormControlLabel control={<Switch onChange={(e) => {
            colorMode.toggleColorMode()
        }} />} label={(theme.palette.mode) === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            checked={theme.palette.mode == 'dark'}
        />
    )
}

export default ThemeSwitch;
