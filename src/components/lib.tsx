import { Box, CircularProgress, Typography } from '@mui/material'
import { ReactNode } from 'react'

export const FullSizeMessage = ({ children }: { children: ReactNode }) => {
	return (
		<Box
			sx={{
				width: '100%',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				fontSize: '2rem',
				bgcolor: '#121212',
			}}
		>
			{children}
		</Box>
	)
}

export const FullSizeError = ({ error }: { error: Error }) => {
	return (
		<FullSizeMessage>
			<Typography sx={{ color: 'red' }}>{error.message}</Typography>
		</FullSizeMessage>
	)
}

export const FullSizeLoading = () => {
	return (
		<FullSizeMessage>
			<CircularProgress />
		</FullSizeMessage>
	)
}
