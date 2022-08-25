import { Box } from '@mui/material'
import styled from '@emotion/styled'
import { useLocation, useNavigate } from 'react-router-dom'
import { ReactComponent as HomeIcon } from '/assets/home.svg'
import { ReactComponent as HomeActiveIcon } from '/assets/home-active.svg'
import { ReactComponent as SearchIcon } from '/assets/search.svg'
import { ReactComponent as SearchActiveIcon } from '/src/assets/search-active.svg'
import { ReactComponent as LibraryIcon } from '/assets/library.svg'
import { Svg } from '../../types'
import { Logo } from '../Icon'

export const SideBar = () => {
	return (
		<Container>
			<Logo />
			<NavBar />
		</Container>
	)
}

const Container = styled.aside`
	width: 15rem;
	height: 100vh;
	background-color: #000;
	padding: 24px;
`

const NavBar = () => {
	return (
		<Box sx={{ marginTop: '1.5rem' }}>
			<NavIcon
				Icon={HomeIcon}
				ActiveIcon={HomeActiveIcon}
				text={'Home'}
				to={'/home'}
			/>
			<NavIcon
				Icon={SearchIcon}
				ActiveIcon={SearchActiveIcon}
				text={'Search'}
				to={'/search'}
			/>
			<NavIcon
				Icon={LibraryIcon}
				ActiveIcon={LibraryIcon}
				text={'Library'}
				to={'/library'}
			/>
		</Box>
	)
}

interface INavIcon {
	Icon: Svg
	ActiveIcon: Svg
	text: string
	to: string
}

const NavIcon = ({ Icon, ActiveIcon, text, to }: INavIcon) => {
	const navigate = useNavigate()
	const location = useLocation()
	const currentPath = location.pathname.split('/').at(-1)
	const handleClick = () => navigate(to)

	return (
		<NavIconButton onClick={handleClick}>
			{currentPath === to ? <ActiveIcon /> : <Icon />}
			<span>{text}</span>
		</NavIconButton>
	)
}

const NavIconButton = styled.a`
	height: 40px;
	border-radius: 4px;
	cursor: pointer;
	display: flex;
	gap: 16px;
	align-items: center;
	color: #b3b3b3;
	font-weight: 700;
	font-size: 0.875rem;
	-webkit-transition-duration: 0.2s;
	-moz-transition-duration: 0.2s;
	-o-transition-duration: 0.2s;
	transition-duration: 0.2s;
	transition-property: color;
	transition-timing-function: linear;

	& > :hover {
		color: #fff;
	}
`
