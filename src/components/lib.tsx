import { Box, BoxProps, CircularProgress, Typography } from '@mui/material'

export const FullSizeMessage = (props: BoxProps) => {
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
			{...props}
		/>
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
