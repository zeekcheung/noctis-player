import {
	Box,
	BoxProps,
	CircularProgress,
	Link as MuiLink,
	styled,
	Typography,
} from '@mui/material'

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

export const FullSizeLoading = (props: BoxProps) => {
	return (
		<FullSizeMessage {...props}>
			<CircularProgress />
		</FullSizeMessage>
	)
}

export const CustomLink = styled(MuiLink)`
	display: block;
	text-decoration-line: none;
	cursor: pointer;
	font-family: var(--font-family, spotify-circular), Helvetica, Arial,
		sans-serif;

	&:hover {
		text-decoration-line: underline;
		color: #fff;
	}
`

export const FlexBox = styled(Box)`
	display: flex;
`

export const StyledFlexBox = styled(Box)`
	display: flex;
	justify-content: space-between;
	align-items: center;
`
