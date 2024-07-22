import React from 'react';
import { Typography, Card, CardContent, Box, CardActions, Button } from '@mui/material';
import MDLayout from '../MDLayout';
const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);
const About = (props) => {
    const { app } = props;
    return (
        <div className="container pt-3">
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Sobre
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{ textAlign: 'justify', marginTop: '1rem' }}>
                        {app.appName} é um projeto com objetivo de facilitar o controle de estoque e vendas, gerar relatórios geral e específicos para auxiliar o contador/tesoureiro a prestar contas com agilidade e transparência.
                    </Typography>

                    <Typography sx={{ fontSize: 14, textAlign: 'center', mt: '2rem', lineHeight: '3rem' }} color="text.secondary" gutterBottom >
                        ({app.appBranch} - Version {app.appVersion})
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </div>
    )
}


About.layout = (page: any) => <MDLayout children={page} />
export default About;