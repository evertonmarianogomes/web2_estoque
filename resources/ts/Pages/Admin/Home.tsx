import React from 'react';
import { Typography } from '@mui/material';

const Home = (props) => {
    const { user } = props;
    return (<>
        <div className="container pt-3">
            <Typography variant="h5" gutterBottom>
                Bem vindo {user.first_name}
            </Typography>
            <hr />

        </div >

    </>);
}

export default Home;