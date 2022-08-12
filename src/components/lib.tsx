import { Box, CircularProgress, Typography } from '@mui/material'
import { ProviderProps } from '../types'

export const FullSizeMessage = ({ children }: ProviderProps) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flex: 1,
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
