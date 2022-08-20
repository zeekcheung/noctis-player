import { Box, SvgIcon } from '@mui/material'
import { HomeIcon, LibraryIcon, Logo, SearchIcon } from '../Icon'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

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
			<NavIcon Icon={HomeIcon} text={'Home'} to={'/home'} />
			<NavIcon Icon={SearchIcon} text={'Search'} to={'/search'} />
			<NavIcon Icon={LibraryIcon} text={'Library'} to={'/library'} />
		</Box>
	)
}

interface INavIcon {
	Icon: typeof SvgIcon
	text: string
	to: string
}

const NavIcon = ({ Icon, text, to }: INavIcon) => {
	const navigate = useNavigate()
	const handleClick = () => navigate(to)

	return (
		<NavIconButton onClick={handleClick}>
			<Icon />
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
