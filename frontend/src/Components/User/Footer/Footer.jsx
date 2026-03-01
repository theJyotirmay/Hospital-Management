



import React from 'react';
import { Avatar, Box, Chip, Container, Divider, Grid, Stack, styled, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import HealingTwoToneIcon from '@mui/icons-material/HealingTwoTone';
import CallIcon from '@mui/icons-material/Call';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

import { alpha, useTheme } from '@mui/material/styles';
import { HashLink } from 'react-router-hash-link';
import { NavLink } from 'react-router-dom';


const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
        marginTop: theme.spacing(2),
    },
}));

// copyright function for generate year automatically
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Developed with 🖤 by '}
            <strong><a className='text-style' href="#" target="_blank" rel="noreferrer noopener">theJS</a> </strong>{'Copyright ©'}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Footer = () => {
    const theme = useTheme();

    return (
        <footer>
            <Box
                className='sticky-container'
                sx={{
                    mt: 4,
                    pb: 2,
                    top: 'auto',
                    backgroundColor: alpha(theme.palette.background.paper, 0.9),
                    backdropFilter: 'blur(10px)',
                    borderTop: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
                    color: 'text.secondary',
                }}
            >
                <Container maxWidth="xl">
                    <Grid container
                        spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid sx={{ m: 'auto' }} item xs={12} sm={6} md={4}>
                            <Box>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    sx={{ mr: 2, display: { xs: 'flex', md: 'flex' } }}
                                > <Avatar sx={{ mt: 1, mb: 1, mr: 1, bgcolor: 'white' }}>
                                        <HealingTwoToneIcon
                                            color='primary'
                                        />
                                    </Avatar>
                                    Pankaj's Hospital
                                </Typography>
                                <Divider />
                            </Box>

                            <Stack direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={1} >
                                <Avatar sx={{ mt: 1, bgcolor: alpha(theme.palette.primary.main, 0.12), color: 'primary.main' }}>
                                    <LocationOnIcon />
                                </Avatar><span>Ahmedabad, India</span>
                            </Stack >

                            <Stack direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={1} >
                                <Avatar sx={{ mb: 1, mt: 1, bgcolor: alpha(theme.palette.primary.main, 0.12), color: 'primary.main' }}>
                                    <EmailIcon />
                                </Avatar>
                                <a className='text-style' href="mailto:eye0781@gmail.com">
                                    eye0781@gmail.com
                                </a>
                            </Stack >

                            <Stack direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={1} >
                                <Avatar sx={{ mb: 1, bgcolor: alpha(theme.palette.primary.main, 0.12), color: 'primary.main' }}>
                                    <CallIcon />
                                </Avatar>
                                <a className='text-style' href="tel:+918906863492">
                                    +91 8906863492
                                </a>
                            </Stack >


                        </Grid>

                        {/* ----------service part ---------------*/}
                        <Grid item xs={12} sm={4}>
                            <Root>
                                <Divider>
                                    <Chip label="Our Services" />
                                </Divider>
                            </Root>

                            <Box sx={{ p: 2 }}><NavLink className='text-style' to='/doctor' color='inherit'>Find a Doctor</NavLink></Box>

                            <Box sx={{ p: 2 }}><NavLink className='text-style' to='/services' color='inherit'>All services</NavLink></Box>

                            <Box sx={{ p: 2 }}><NavLink className='text-style' to='/doctor' color='inherit'>Make An Appointment</NavLink></Box>

                            <Box sx={{ p: 2 }}><NavLink className='text-style' to='/contact' color='inherit'>Contact Us </NavLink></Box>
                        </Grid>

                        {/* ----------social media part ------------*/}

                        <Grid item xs={12} sm={4}>
                            <Root>
                                <Divider>
                                    <Chip label="Find us on social media" />
                                </Divider>
                            </Root>

                            <Stack direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={1} >
                                <Avatar sx={{ mb: 1, mt: 1, bgcolor: alpha(theme.palette.primary.main, 0.12), color: 'primary.main' }}>
                                    <FacebookIcon />
                                </Avatar>
                                <a className='text-style' href="#" target="_blank" rel="noopener noreferrer" >
                                    Facebook
                                </a>
                            </Stack >

                            <Stack direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={1} >
                                <Avatar sx={{ mb: 1, bgcolor: alpha(theme.palette.primary.main, 0.12), color: 'primary.main' }}>
                                    <LinkedInIcon />
                                </Avatar>
                                <a className='text-style' href="#" target="_blank" rel="noopener noreferrer" >
                                    LinkedIn
                                </a>
                            </Stack >

                            <Stack direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={1} >
                                <Avatar sx={{ mb: 1, bgcolor: alpha(theme.palette.primary.main, 0.12), color: 'primary.main' }}>
                                    <GitHubIcon />
                                </Avatar>
                                <a className='text-style' href="#" target="_blank" rel="noopener noreferrer" >
                                    GitHub
                                </a>
                            </Stack >


                        </Grid>

                    </Grid>
                    <Divider sx={{ mb: 2 }} />
                    <Copyright sx={{ mt: 5 }} />

                </Container>
            </Box>

        </footer >
    );
};

export default Footer;