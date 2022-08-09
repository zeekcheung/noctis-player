import { Box } from '@mui/material'

export const FullPageError = ({ error }: { error: Error }) => {
	return (
		<Box
			sx={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				color: 'red',
				fontSize: '2rem',
			}}
		>
			{error.message}
		</Box>
	)
}
