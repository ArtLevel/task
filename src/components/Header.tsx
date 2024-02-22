import { AppBar, Grid, Toolbar, Typography } from '@mui/material'
import React from 'react'

export const Header = () => {
	return <AppBar position="static">
		<Toolbar>
			<Grid container justifyContent="space-between">
				<Grid item>
					<Typography variant="h6" color="inherit">
						SHOP
					</Typography>
				</Grid>
			</Grid>
		</Toolbar>
		{/*{loading === 'loading' && <LinearProgress />}*/}
	</AppBar>
}
