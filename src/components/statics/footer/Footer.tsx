import { Grid, Typography } from '@material-ui/core';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box } from '@mui/material';
import './Footer.css';

function Footer() {
    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid alignItems="center" item xs={12} className='redes-bg'>
                    <Box>
                        <Box paddingTop={1} display="flex" alignItems="center" justifyContent="center">
                            <Typography align="center" gutterBottom className='chamada'>Me siga nas redes sociais </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" justifyContent="center">
                            <a href="https://github.com/fabianagsilva" target="_blank">
                                <GitHubIcon className='redes' />
                            </a>

                            <a href="https://www.linkedin.com/in/fabianagoncalvessilva/" target="_blank">
                                <LinkedInIcon className='redes' />
                            </a>
                        </Box>
                    </Box>
                    <Box className='box2'>
                        <Box>
                            <Typography variant="subtitle2" gutterBottom className='texto' align="center">Fabiana Gonçalves - © 2022 Copyright</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Footer;