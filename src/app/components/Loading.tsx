import { Backdrop, CircularProgress, Typography } from '@mui/material'
import React from 'react'

const Loading = () => {
    return(
        <>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={true}
            >
                <Typography variant='h5' sx={{ marginRight: 2 }}>Loading</Typography><CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default Loading