"use client"

import { Alert, Backdrop, Box, Button, CircularProgress, Container, FormControl, FormControlLabel, FormLabel, Grid2, Radio, RadioGroup, ThemeProvider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { darkTheme } from '@/app/theme/darkTheme'
import { PieChart } from '@mui/x-charts/PieChart';
import { useParams } from 'next/navigation';
import { getPollData, getVotes, voteOnPoll } from '@/app/server/actions';
import { poll } from '../interfaces/interfaces';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

const PollDashboard = () => {
    const { user } = useKindeBrowserClient();

    const params = useParams();
    const pollId: string = params.pollId.toString();

    const [poll, setPoll] = useState<poll>();
    const [loading, setLoading] = useState(true);

    const [optionSelected, setOptionSelected] = useState('');

    const [voteResult, setVoteResult] = useState('');

    const [optionAResult, setOptionAResult] = useState(1);
    const [optionBResult, setOptionBResult] = useState(1);

    const [logInDialogBox, setLogInDialogBox] = useState(false)

    const [alertVisibility, setAlertVisibility] = useState("hidden");
    const [alertType, setAlertType] = useState<'success' | 'error' | 'warning' | 'info'>('success');

    const votes = [
        { id: 0, value: optionAResult, label: poll?.options[0].text },
        { id: 1, value: optionBResult, label: poll?.options[1].text }
    ]

    const handleVoteResult = (result: string, alertType: string) => {
        setAlertVisibility("visible");
        setVoteResult(result);
        setAlertType(alertType)
    }

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
    }, [loading, voteResult])

    const handleVote = async () => {
        if (!poll) return

        if (user !== null){
            const { result, alertType } = await voteOnPoll(poll?.id, optionSelected, user.id);
            handleVoteResult(result, alertType)
        } else {
            setLogInDialogBox(true)
        }
    }

    if (loading) return <p>Loading</p>

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

                                <Button variant='contained' className='mt-2' onClick={handleVote}>Vote</Button>
                            </FormControl> 
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
                        <Grid2 size={12} sx={{ paddingX: 4, visibility: alertVisibility }}>
                            <Alert severity={alertType}> {voteResult} </Alert>
                        </Grid2>
                    </Container>
                </Grid2>

                
            </ThemeProvider>

            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={logInDialogBox}
                onClick={() => setLogInDialogBox(false)}
            >
                <Container maxWidth="xs" sx={{ p: 1 }}>
                    <Grid2 bgcolor="background.paper" sx={{ py: 5,  textAlign: 'center' }}>
                        <Typography variant='h5' color='text.secondary' className='inter-200'> To vote you need to log in </Typography>
                        <Button href='/api/auth/login' className='inter-700 mt-3' variant='outlined'>Log in</Button> <br/>
                        <Button href='/api/auth/register' className='inter-700 mt-3' variant='contained'>Sign in</Button>
                    </Grid2>
                </Container>
            </Backdrop>
        </>
    )
}

export default PollDashboard