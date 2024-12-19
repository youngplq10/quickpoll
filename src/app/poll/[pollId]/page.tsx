import Navbar from '@/app/components/Navbar'
import PollDashboard from '@/app/components/PollDashboard'
import React from 'react'

const page = async () => {

    return(
        <>
            <Navbar />
            <PollDashboard />
        </>
    )
}

export default page