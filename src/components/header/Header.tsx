import { AppBar, Grid, LinearProgress, Toolbar, Typography } from '@mui/material'
import React, { memo } from 'react'
import { useAppSelector } from '../../store/store'
import { appSelectors } from '../../store/slices/app/appSlice'

export const Header = memo(() => {
		const status = useAppSelector(appSelectors.getAppStatus)

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
)