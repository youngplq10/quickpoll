"use client"

import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Grid2, Radio, RadioGroup, ThemeProvider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { darkTheme } from '@/app/theme/darkTheme'
import { PieChart } from '@mui/x-charts/PieChart';
import { useParams } from 'next/navigation';
import { getPollData, getVotes, voteOnPoll } from '@/app/server/actions';
import { poll } from '../interfaces/interfaces';

const PollDashboard = () => {
    const params = useParams();
    const pollId: string = params.pollId.toString();

    const [poll, setPoll] = useState<poll>();
    const [loading, setLoading] = useState(true);

    const [optionSelected, setOptionSelected] = useState('');

    const [voteResult, setVoteResult] = useState('test');

    const [optionAResult, setOptionAResult] = useState(1);
    const [optionBResult, setOptionBResult] = useState(1);

    const votes = [
        { id: 0, value: optionAResult, label: poll?.options[0].text },
        { id: 1, value: optionBResult, label: poll?.options[1].text }
    ]

    useEffect(() => {
        const getPoll = async () => {
            const { poll } = await getPollData(pollId);

            if (!poll) return

            setPoll(poll)
            setLoading(false)
        }
        getPoll();
    }, [])

    useEffect(() => {
        if (!poll) return

        const getVotesFE = async () => {
            const { optionAResult, optionBResult } = await getVotes(poll?.id, poll?.options[0].id, poll?.options[1].id);

            setOptionAResult(optionAResult);
            setOptionBResult(optionBResult);
        }

        getVotesFE()
    }, [loading])

    const handleVote = async () => {
        if (!poll) return

        const { result } = await voteOnPoll(poll?.id, optionSelected);
        setVoteResult(result)
    }

    if (loading) return <p>Loading</p>

    console.log(optionAResult)
    console.log(optionBResult)

    return(
        <>
            <ThemeProvider theme={darkTheme}>
                <Grid2 bgcolor="background.paper">
                    <Container maxWidth="lg" sx={{ p: 1 }}>
                        <Grid2 sx={{ p: 4 }}> 
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
                        </Grid2>
                        <Grid2 size={12} sx={{ paddingX: 4 }}>
                            <Typography variant='h6' color='success.main' className='inter-200'> { voteResult } </Typography>
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
                                data: [
                                    { id: 0, value: optionAResult, label: poll?.options[0].text },
                                    { id: 1, value: optionBResult, label: poll?.options[1].text }
                                ]
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