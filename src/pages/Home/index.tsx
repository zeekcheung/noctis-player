import styled from '@emotion/styled'
import {
	Box,
	BoxProps,
	Button,
	ButtonGroup,
	ButtonProps,
	SvgIcon,
} from '@mui/material'

import Brightness7Icon from '@mui/icons-material/Brightness7'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import HomeIcon from '@mui/icons-material/Home'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic'
import SearchIcon from '@mui/icons-material/Search'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth, useUser } from '../../contexts/AuthProvider'
import { useSnackbar } from '../../contexts/SnackbarProvider'
import { SX } from '../../types/themes'

export default function Home() {
	return (
		<Container>
			<SideBar>
				<Logo />
				<NavBar />
			</SideBar>
			<Main>
				<HeaderBar />
				<Outlet />
			</Main>
		</Container>
	)
}

const Container = styled(Box)`
	width: 100vw;
	height: 100vh;
	display: flex;
`

const SideBar = styled.aside`
	width: 15rem;
	height: 100vh;
	background-color: #000;
	padding: 1.5rem;
`

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

const Main = styled.main`
	flex: 1;
	display: flex;
	flex-direction: column;
	position: relative;
`

const HeaderBar = () => {
	return (
		<HeaderContainer>
			<ButtonGroup>
				<NavigateButton Icon={ChevronLeftIcon} type={'back'} />
				<NavigateButton Icon={ChevronRightIcon} type={'forward'} />
			</ButtonGroup>
			<LogButton />
		</HeaderContainer>
	)
}

const HeaderContainer = (props: BoxProps) => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				bgcolor: '#090909',
				opacity: '.8',
				height: '4rem',
				padding: '.5rem 1.5rem',
				position: 'absolute',
				left: '0',
				right: '.8rem',
				zIndex: '10',
			}}
			{...props}
		/>
	)
}

interface INavigateButton {
	Icon: typeof SvgIcon
	type: 'forward' | 'back'
}

const NavigateButton = ({ Icon, type }: INavigateButton) => {
	const handleClick = () => {
		if (type === 'forward') {
			window.history.forward()
		}
		window.history.back()
	}

	return (
		<Button variant="text" onClick={handleClick}>
			<Icon sx={{ color: 'white', fontSize: '2rem' }} />
		</Button>
	)
}

const LogButton = () => {
	const user = useUser()
	const { logout } = useAuth()
	const { openSnackbar, setMessage, setAnchorOrigin } = useSnackbar()
	const navigate = useNavigate()
	const content = user ? 'Log out' : 'Log in'

	const handleClick = () => {
		if (user) {
			// 如果处于登陆状态，则进行登出
			logout()
				.then(() => {
					setMessage('退出登录成功！')
				})
				.catch((err) => {
					setMessage(`退出登录失败, ${err}`)
				})
				.finally(() => {
					setAnchorOrigin({ vertical: 'bottom', horizontal: 'right' })
					openSnackbar()
				})
		} else {
			navigate('/login')
		}
	}

	return <LogBaseButton onClick={handleClick}>{content}</LogBaseButton>
}

export const LogBaseButton = (props: ButtonProps) => {
	return (
		<Button
			variant="contained"
			sx={{
				padding: '.5rem 1.8rem',
				marginRight: '.5rem',
				fontSize: '1rem',
				fontWeight: 'bold',
				bgcolor: '#fff',
				borderRadius: '3rem',
				textTransform: 'none',
				'&:hover': {
					bgcolor: '#ddd',
				},
			}}
			{...props}
		/>
	)
}
