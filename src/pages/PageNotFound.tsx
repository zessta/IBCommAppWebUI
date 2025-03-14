import React from 'react'
import { Box, Typography } from '@mui/material'

const PageNotFound = () => {
  return (
    <Box sx={{position:"absolute", top:"20%", left:"50%", transform:"translate(-50%, -50%)", textAlign:"center"}}>
        <Typography variant="h4">404</Typography>
        <Typography variant="h4">Page Not Found</Typography>
    </Box>
  )
}

export default PageNotFound