"use client"

import { Alert, Container, Divider, FormControl, FormControlLabel, FormLabel, Grid2, IconButton, List, ListItem, ListItemText, RadioGroup, Snackbar, ThemeProvider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { darkTheme } from '@/app/theme/darkTheme'
import DeleteIcon from '@mui/icons-material/Delete';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { poll } from '../interfaces/interfaces';
import { getMyPolls, removePoll } from '../server/actions';
import Loading from './Loading';

const ProfileDashboard = () => {

    const { user } = useKindeBrowserClient();

    const [polls, setPolls] = useState<poll[]>([]);

    const [refreshPolls, setRefreshPolls] = useState(0);

    const [removedPollAlert, setRemovedPollAlert] = useState(false)

    const handleRemove = (pollId: string) => {
        removePoll(pollId);
        setRefreshPolls((prev) => prev+1)
        setRemovedPollAlert(true)
    }

    useEffect(() => {
        if (!user?.id) return

        const getPolls = async () => {
            const { polls } = await getMyPolls(user?.id)
            if (!polls) return
            setPolls(polls)
        }
        getPolls()
    }, [user?.id, refreshPolls])

    if (polls===undefined) return <Loading />

    console.log(polls)

    return(
        <>
            <ThemeProvider theme={darkTheme}>
                <Grid2 bgcolor="background.paper">
                    <Container maxWidth="lg" sx={{ p: 1 }}>
                        <Grid2 sx={{ p: 4 }} size={12}> 
                            <Divider className='text-white h4'>My polls</Divider>

                            <List sx={{ width: '100%', bgcolor: 'background.paper', pt: 5 }}>
                                {polls.map((poll, index) => (
                                    <>
                                        <ListItem
                                        key={index}
                                        disableGutters
                                        secondaryAction={
                                            <IconButton aria-label="comment" sx={{ width: '25%' }} onClick={() => handleRemove(poll.id)} >
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                        >
                                        <ListItemText sx={{ width: '25%' }} className='text-white' primary={poll.question} />
                                        <ListItemText sx={{ width: '25%' }}  className='text-white' primary={poll.options[0].text} />
                                        <ListItemText sx={{ width: '25%' }}  className='text-white' primary={poll.options[1].text} />
                                        
                                        </ListItem>
                                        <Divider className='text-white h4'></Divider>
                                    </>
                                    
                                ))}
                            </List>
                        </Grid2>
                    </Container>
                </Grid2>

                <Snackbar open={removedPollAlert} autoHideDuration={6000} onClose={() => setRemovedPollAlert(false)}>
                    <Alert
                        onClose={() => setRemovedPollAlert(false)}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Poll has been removed!
                    </Alert>
                </Snackbar>
            </ThemeProvider>
        </>
    )
}

export default ProfileDashboard