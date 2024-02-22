import { AppBar, Grid, LinearProgress, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../store/store'

export const Header = () => {
	const status = useAppSelector(state => state.app.status)

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
		{status === 'loading' && <LinearProgress />}
	</AppBar>
}
