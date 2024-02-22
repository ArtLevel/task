import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { Product } from '../types'

// @ts-ignore
import productImg from '../icons/productImg.jpg'

type Props = {
	item: Product
}

export const CardOfProduct = (props: Props) => {
	const { item } = props

	return <Grid item>
		<Card sx={{ minWidth: 500, maxWidth: 500, minHeight: 360, maxHeight: 360 }}>
			<CardContent>
				<CardMedia
					sx={{ height: 180 }}
					image={productImg}
					title={item.product}
				/>
				<Typography gutterBottom variant="h5" component="div">
					{item.product}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Id: {item.id}
				</Typography>

				<Typography variant="body2" color="text.secondary">
					Brand: {item.brand || 'Not a Brand ! '}
				</Typography>

				<Typography variant="body2" color="text.secondary">
					Price: {item.price} &#8381;
				</Typography>
			</CardContent>
			<CardActions>
				{/*<IconButton onClick={addProductHandler}>*/}
				{/*	<AddIcon />*/}
				{/*</IconButton>*/}
				{/*<Typography variant="body2" color="text.secondary">*/}
				{/*	Count: {count}*/}
				{/*</Typography>*/}
				{/*<IconButton onClick={removeProductHandler}>*/}
				{/*	<RemoveIcon />*/}
				{/*</IconButton>*/}
			</CardActions>
		</Card>
	</Grid>
}