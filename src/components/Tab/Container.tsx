import { Box, BoxProps } from '@mui/material'
import { Footer } from './Footer'

export const Container = (props: BoxProps) => {
	return (
		<Box
			sx={{
				bgcolor: '#121212',
				color: '#fff',
				display: 'flex',
				flexDirection: 'column',
				flex: 1,
				overflow: 'overlay',
				padding: '5.5rem 2rem 1.5rem',
			}}
			{...props}
		>
			<Footer />
		</Box>
	)
}
