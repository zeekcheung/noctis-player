import { Box, CircularProgress, Typography } from '@mui/material'
import { ReactNode } from 'react'

export const FullPageMessage = ({ children }: { children: ReactNode }) => {
	return (
		<Box
			sx={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				fontSize: '2rem',
			}}
		>
			{children}
		</Box>
	)
}

export const FullPageError = ({ error }: { error: Error }) => {
	return (
		<FullPageMessage>
			<Typography sx={{ color: 'red' }}>{error.message}</Typography>
		</FullPageMessage>
	)
}

export const FullPageLoading = () => {
	return (
		<FullPageMessage>
			<CircularProgress />
		</FullPageMessage>
	)
}
