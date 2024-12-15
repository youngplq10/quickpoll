"use client"

import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Grid2, Radio, RadioGroup, ThemeProvider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { darkTheme } from '@/app/theme/darkTheme'
import { PieChart } from '@mui/x-charts/PieChart';
import { useParams } from 'next/navigation';
import { getPollData } from '@/app/server/actions';

const PollDashboard = () => {
    const params = useParams();
    const pollId: string = params.pollId.toString();

    const [poll, setPoll] = useState();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getPoll = async () => {
            const { poll } = await getPollData(pollId);
            setPoll(poll)
            setLoading(false)
        }
        getPoll();
    })
    
    console.log(poll)

    if (loading) return <p>Loading</p>

    return(
        <>
            <ThemeProvider theme={darkTheme}>
                <Grid2 bgcolor="background.paper">
                    <Container maxWidth="lg" sx={{ p: 1 }}>
                        <Grid2 sx={{ p: 4 }}>
                            

                            <div>
                            <FormControl>
                                <FormLabel id="demo-controlled-radio-buttons-group" className='text-white'>
                                    <Typography className='inter-200' variant='h4' color='text.primary'>
                                        Question
                                    </Typography>
                                </FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    className='mt-2'
                                >
                                    <FormControlLabel value="female" className='text-white inter-200' control={<Radio />} label="Answer 1" />
                                    <FormControlLabel value="male" className='text-white inter-200' control={<Radio />} label="Answer 2" />
                                </RadioGroup>

                                <Button variant='contained' className='mt-2'>Submit</Button>
                            </FormControl>
                            </div>
                        </Grid2>

                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ p: 4 }}
                        >
                        <PieChart
                            series={[
                                {
                                data: poll,
                                },
                            ]}
                            width={400}
                            height={200}
                        />
                        </Box>
                    </Container>
                </Grid2>
            </ThemeProvider>
        </>
    )
}

export default PollDashboard