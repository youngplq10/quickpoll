"use client"
import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Container, Grid2, Stack, ThemeProvider } from '@mui/material';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import { darkTheme } from '@/app/theme/darkTheme';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import AvatarImg from "@/app/assets/avatar.png"

const Navbar = () => {
  const { isAuthenticated } = useKindeBrowserClient();
  const isLoggedIn = isAuthenticated;

  return(
    <>
      <ThemeProvider theme={darkTheme}>
        <AppBar position='static' sx={{ bgcolor: "background.default", p: 1 }}>
            <Container maxWidth="lg">
              <Toolbar>
                <IconButton size='large' color='inherit' href='#'>
                  <HowToVoteIcon />
                </IconButton>
                <Typography variant='h6' component="a" href='#' sx={{ textDecoration: "none", flexGrow: 1, }} color='inherit' className='inter-300'>
                  QuickPoll
                </Typography>

                {
                  isLoggedIn ? (
                    <Avatar alt='avatar' src={AvatarImg.src} />
                  ) : (
                    <Stack direction="row" spacing={2}>
                      <Button variant='outlined' href='/api/auth/login' className='inter-600'>Log in</Button>
                      <Button variant='contained' href='/api/auth/register' className='inter-600'>Sign up</Button>
                    </Stack>
                  )
                }
              </Toolbar>
            </Container>
          </AppBar>
      </ThemeProvider>
    </>
  )
}

export default Navbar