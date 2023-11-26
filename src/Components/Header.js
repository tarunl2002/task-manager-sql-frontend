import { AppBar, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Header = () => {
  return (
    <Box>
        <AppBar color="primary">
            <Toolbar>
                <Typography variant='h4'>Task Manager</Typography>
                <Typography variant='h6' ml="auto"> Never miss any dealdine</Typography>
            </Toolbar>
        </AppBar>
    </Box>
  )
}

export default Header