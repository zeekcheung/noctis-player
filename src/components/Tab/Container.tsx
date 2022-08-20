import { BoxProps } from '@mui/material'
import { Footer } from './Footer'
import { FlexBox } from '../lib'

export const Container = ({ children, ...props }: BoxProps) => {
	return (
		<FlexBox
			sx={{
				bgcolor: '#121212',
				color: '#fff',
				flexDirection: 'column',
				flex: 1,
				overflow: 'overlay',
				padding: '5.5rem 2rem 1.5rem',
			}}
			{...props}
		>
			{children}
			<Footer />
		</FlexBox>
	)
}
