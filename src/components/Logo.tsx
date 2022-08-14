import { SX } from '../types/themes'
import { useNavigate } from 'react-router-dom'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { Button, ButtonProps } from '@mui/material'

interface ILogo {
	btnSx?: SX
	iconSx?: SX
}

export const Logo = ({ btnSx, iconSx }: ILogo) => {
	const navigate = useNavigate()
	const handleClick = () => navigate('/')

	return (
		<LogoButton onClick={handleClick} btnSx={btnSx}>
			<Brightness7Icon
				sx={{ fontSize: '2.5rem', marginRight: '5px', ...iconSx }}
			/>
			Noctis
		</LogoButton>
	)
}

const LogoButton = ({ btnSx, ...props }: ButtonProps & ILogo) => {
	return (
		<Button
			sx={{
				fontSize: '1.5rem',
				fontWeight: '700',
				textTransform: 'none',
				letterSpacing: '0',
				color: 'white',
				padding: 0,
				...btnSx,
			}}
			{...props}
		/>
	)
}
