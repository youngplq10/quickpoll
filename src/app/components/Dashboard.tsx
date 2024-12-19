"use client"

import { Button, Container, Divider, FormControlLabel, Grid2, Switch, TextField, ThemeProvider, Typography } from '@mui/material'
import React, { useState } from 'react'
import { darkTheme } from '@/app/theme/darkTheme'
import CreateIcon from '@mui/icons-material/Create';
import { createPoll } from '@/app/server/actions';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

const Dashboard = () => {
    const [numberOfAnswers, setNumberOfAnswers] = useState(2);

    const [question, setQuestion] = useState('');
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');

    const { user } = useKindeBrowserClient();

    const handleCreatePoll = () => {
        createPoll(question, answer1, answer2, user?.id || "");
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Grid2 bgcolor="background.paper">
                <Container maxWidth="lg" sx={{ p: 1 }}>
                    <Grid2 bgcolor="background.paper" sx={{ p: 4 }}>
                        <Typography variant='h3' color='text.primary' className='inter-200'>
                            Create Poll
                        </Typography>
                        <Divider sx={{ mt: 2 }} />
                    </Grid2>

                    <Grid2 sx={{ minHeight: "100vh", px: 4, py: 2 }}>
                        <div className='mb-4'>
                            <TextField 
                                required
                                variant='outlined'
                                label="Question"  
                                id='question'
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                        </div>
                        <div className='mb-4'>
                            <TextField 
                                variant='outlined'
                                label='Answer 1'
                                id='answer-1'
                                value={answer1}
                                onChange={(e) => setAnswer1(e.target.value)}
                            />
                        </div>
                        <div className='mb-4'>
                            <TextField 
                                variant='outlined'
                                label='Answer 2'
                                id='answer-2'
                                value={answer2}
                                onChange={(e) => setAnswer2(e.target.value)}
                            />
                        </div>
                        <div className='mb-4'>
                            <Button
                                variant='contained'
                                startIcon={<CreateIcon />}
                                onClick={handleCreatePoll}
                            >
                                Create poll
                            </Button>
                        </div>
                    </Grid2>
                </Container>
            </Grid2>
        </ThemeProvider>
    )
}

export default Dashboard