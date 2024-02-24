import { Button, FormControl, FormGroup, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useFilter } from './useFilter'

export const Filter = () => {
	const { formik, fieldsOfFilter, errorOfTextField, isDisabledButton } = useFilter()

	const content = formik.values.filterType !== 'off' &&
		<TextField
			error={errorOfTextField}
			label={errorOfTextField ? formik.errors.value : 'Search'}
			type={formik.values.filterType === 'price' ? 'number' : 'text'}
			{...formik.getFieldProps('value')}
		/>
	
	return <Grid container justifyContent="center">
		<Grid item xs={4}>
			<form onSubmit={formik.handleSubmit}>
				<FormControl style={{ display: 'flex', marginTop: '2rem' }}>
					<FormGroup style={{ display: 'flex', gap: '20px' }}>
						<InputLabel>Filter</InputLabel>
						<Select
							label="Filter"
							{...formik.getFieldProps('filterType')}
						>
							<MenuItem value="off">Off</MenuItem>
							{fieldsOfFilter.map(field => <MenuItem value={field} key={field}>{field}</MenuItem>)}
						</Select>
						{content}
						<Button type="submit" variant="contained" color="primary"
										disabled={isDisabledButton}>Search</Button>
					</FormGroup>
				</FormControl>
			</form>
		</Grid>
	</Grid>
}
