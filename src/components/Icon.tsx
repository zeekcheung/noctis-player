import { SX } from '../types/themes'
import { useNavigate } from 'react-router-dom'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { Button, ButtonProps, createSvgIcon } from '@mui/material'

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

export const HomeIcon = createSvgIcon(
	<path
		d="M12.5 3.247a1 1 0 00-1 0L4 7.577V20h4.5v-6a1 1 0 011-1h5a1 1 0 011
				1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 013 0l7.5 4.33a2 2 0 011 1.732V21a1
				 1 0 01-1 1h-6.5a1 1 0 01-1-1v-6h-3v6a1 1 0 01-1 1H3a1 1 0 01-1-1V7.577a2
				 2 0 011-1.732l7.5-4.33z"
	/>,
	'Home'
)

export const SearchIcon = createSvgIcon(
	<path
		d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407
				9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157
				9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006
				3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407
				7.279-7.407-3.273-7.407-7.28z"
	/>,
	'Search'
)

export const LibraryIcon = createSvgIcon(
	<path
		d="M14.5 2.134a1 1 0 011 0l6 3.464a1 1 0 01.5.866V21a1 1 0 01-1 1h-6a1
				1 0 01-1-1V3a1 1 0 01.5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0
				01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zm6 0a1 1 0 01-1-1V3a1 1 0 012 0v18a1
				1 0 01-1 1z"
	/>,
	'Library'
)
