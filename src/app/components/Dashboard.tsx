"use client"

import { Container, Divider, Grid2, ThemeProvider, Typography } from '@mui/material'
import React from 'react'
import { darkTheme } from '@/app/theme/darkTheme'

const Dashboard = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <Grid2 bgcolor="background.paper">
                <Container maxWidth="lg" sx={{ p: 1 }}>
                    <Grid2 bgcolor="background.paper" sx={{ minHeight: "100vh", p: 4 }}>
                        <Typography variant='h3' color='text.primary'>
                            Create Poll
                        </Typography>
                        <Divider sx={{ mt: 2 }} />
                    </Grid2>
                </Container>
            </Grid2>
        </ThemeProvider>
    )
}

export default Dashboard