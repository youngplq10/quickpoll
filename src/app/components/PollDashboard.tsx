"use client"

import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Grid2, Radio, RadioGroup, ThemeProvider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { darkTheme } from '@/app/theme/darkTheme'
import { PieChart } from '@mui/x-charts/PieChart';
import { useParams } from 'next/navigation';
import { getPollData } from '@/app/server/actions';
import { poll } from '../interfaces/interfaces';

const PollDashboard = () => {
    const params = useParams();
    const pollId: string = params.pollId.toString();

    const [poll, setPoll] = useState<poll>();
    const [loading, setLoading] = useState(true);

    const [optionSelected, setOptionSelected] = useState('');

    useEffect(() => {
        const getPoll = async () => {
            const { poll } = await getPollData(pollId);

            if (!poll) return

            setPoll(poll)
            setLoading(false)
        }
        getPoll();
    }, [])

    const handleVote = () => {
        console.log(optionSelected)
    }
    
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
                                        { poll?.question }
                                    </Typography>
                                </FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    className='mt-2'
                                    onChange={(e) => setOptionSelected(e.target.value)}
                                >
                                    <FormControlLabel value={ poll?.options[0].id } className='text-white inter-200' control={<Radio />} label={ poll?.options[0].text } />
                                    <FormControlLabel value={ poll?.options[1].id } className='text-white inter-200' control={<Radio />} label={ poll?.options[1].text } />
                                </RadioGroup>

                                <Button variant='contained' className='mt-2' onClick={handleVote}>Submit</Button>
                            </FormControl>
                            </div>
                        </Grid2>

                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ p: 4 }}
                        >
                        {/*<PieChart
                            series={[
                                {
                                data: poll,
                                },
                            ]}
                            width={400}
                            height={200}
                        />*/}
                        </Box>
                    </Container>
                </Grid2>
            </ThemeProvider>
        </>
    )
}

export default PollDashboard