import { Button, ButtonGroup, ButtonProps, SvgIcon } from '@mui/material'
import { Logo } from '../Logo'
import styled from '@emotion/styled'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic'
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
	padding: 1.5rem;
`

const NavBar = () => {
	return (
		<ButtonGroup orientation="vertical" sx={{ marginTop: '1.5rem' }} fullWidth>
			<NavIcon Icon={HomeIcon} text={'Home'} to={'/home'} />
			<NavIcon Icon={SearchIcon} text={'Search'} to={'/search'} />
			<NavIcon Icon={LibraryMusicIcon} text={'Library'} to={'/library'} />
		</ButtonGroup>
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
			<Icon sx={{ fontSize: '2rem', marginRight: '.8rem' }} />
			{text}
		</NavIconButton>
	)
}

const NavIconButton = (props: ButtonProps) => {
	return (
		<Button
			sx={{
				justifyContent: 'flex-start',
				textTransform: 'none',
				fontSize: '1rem',
				fontWeight: '700',
				fontFamily:
					'var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif))',
				paddingLeft: '0',
				borderWidth: '0',
				'&:hover': {
					borderWidth: '0',
					color: '#fff',
				},
			}}
			{...props}
		/>
	)
}
