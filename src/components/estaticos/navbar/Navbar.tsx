import React from 'react';
import './Navbar.css';
import { AppBar, Toolbar, Typography, Grid } from '@material-ui/core';
import { Box } from '@mui/material';

export default function Navbar() {
    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense" style={{ backgroundColor: "#252525", height: "60px" }}>
                    <Box style={{ cursor: 'pointer' }}>
                        <Typography variant="h5" color="inherit"> Blog Pessoal </Typography>
                    </Box>
                    <Grid alignItems="center" item xs={8}>
                        <Box display="flex" justifyContent="center">
                            <Box mx={1} style={{ cursor: 'pointer' }}>
                                <Typography variant="h6" color="inherit" className="font-15"> Home </Typography>
                            </Box>

                            <Box mx={1} style={{ cursor: 'pointer' }}>
                                <Typography variant="h6" color="inherit" className='font-15'> Sobre mim </Typography>
                            </Box>

                            <Box mx={1} style={{ cursor: 'pointer' }}>
                                <Typography variant="h6" color="inherit" className='font-15'> Portfólio </Typography>
                            </Box>

                            <Box mx={1} style={{ cursor: 'pointer' }}>
                                <Typography variant="h6" color="inherit" className='font-15'> Contato </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Box mx={1} style={{ cursor: 'pointer' }}>
                        <Typography variant="h6" color="inherit" className='font-15'> Fazer Login </Typography>
                    </Box>

                    <Box mx={1} style={{ cursor: 'pointer' }}>
                        <Typography variant="h6" color="inherit" className='font-15'> Encerrar Sessão </Typography>
                    </Box>

                </Toolbar>
            </AppBar>
        </>
    );
}