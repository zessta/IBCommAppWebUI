import React, { useEffect } from 'react'
import { removeItem } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';

const SignOut = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        setTimeout(()=>{
            removeItem("token");
            navigate("/login");
        },1000)
    })
    return(
        <Box sx={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)"}}>
            <Typography variant="h5" sx={{display:"flex", alignItems:"center", gap:4}}>Signing Out ... <CircularProgress/></Typography>
        </Box>
    )
}

export default SignOut