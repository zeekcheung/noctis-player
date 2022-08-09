import styled from '@emotion/styled'
import { Button, ButtonGroup, Popper, SvgIcon } from '@mui/material'
import { Box } from '@mui/system'

import Brightness7Icon from '@mui/icons-material/Brightness7'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import HomeIcon from '@mui/icons-material/Home'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { login } from '../../api/user'
import { useUser } from '../../contexts/AuthProvider'

export default function Home() {
	return (
		<Container>
			<SideBar>
				<Logo />
				<NavBar />
			</SideBar>
			<Main>
				<HeadBar />
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
	width: 24em;
	height: 100vh;
	background-color: #000;
	padding: 2.5em 2em;
`

const Logo = () => {
	const navigate = useNavigate()
	const handleClick = () => navigate('/')

	return (
		<Button
			sx={{
				fontSize: '2.5rem',
				fontWeight: '700',
				textTransform: 'none',
				letterSpacing: '0',
				color: 'white',
				padding: 0,
			}}
			onClick={handleClick}
		>
			<Brightness7Icon sx={{ fontSize: '4rem', marginRight: '5px' }} />
			Noctis
		</Button>
	)
}

const NavBar = () => {
	return (
		<ButtonGroup orientation="vertical" sx={{ marginTop: '2rem' }} fullWidth>
			<NavIcon Icon={HomeIcon} text={'Home'} to={'/home'} />
			<NavIcon Icon={SearchIcon} text={'Search'} to={'/search'} />
			<NavIcon Icon={LibraryMusicIcon} text={'Library'} to={'/library'} />
		</ButtonGroup>
	)
}

const NavIcon = ({
	Icon,
	text,
	to,
}: {
	Icon: typeof SvgIcon
	text: string
	to: string
}) => {
	const navigate = useNavigate()
	const handleClick = () => navigate(to)

	return (
		<Button
			sx={{
				justifyContent: 'flex-start',
				textTransform: 'none',
				fontSize: '1.3em',
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
			onClick={handleClick}
		>
			<Icon sx={{ fontSize: '3.2rem', marginRight: '1rem' }} />
			{text}
		</Button>
	)
}

const Main = styled.main`
	flex: 1;
`

const HeadBar = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				bgcolor: '#090909',
				height: '6.5rem',
				padding: '1em 2em',
				position: 'sticky',
			}}
		>
			<ButtonGroup>
				<NavigateButton Icon={ChevronLeftIcon} type={'back'} />
				<NavigateButton Icon={ChevronRightIcon} type={'forward'} />
			</ButtonGroup>
			<LogButton />
		</Box>
	)
}

const NavigateButton = ({
	Icon,
	type,
}: {
	Icon: typeof SvgIcon
	type: 'forward' | 'back'
}) => {
	// TODO: 根据 history 决定 disable 和 color
	const handleClick = () => {
		if (type === 'forward') {
			window.history.forward()
		}
		window.history.back()
	}

	return (
		<Button variant="text" onClick={handleClick}>
			<Icon sx={{ color: 'white', fontSize: '3.5rem' }} />
		</Button>
	)
}

const LogButton = () => {
	// TODO: 根据登录状态显示不同内容
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
	const [popperContext, setPopperContext] = useState('')

	const user = useUser()
	const content = user ? 'Log out' : 'Log in'

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		login('13727819601', 'zz2001..')
			.then((data) => {
				console.log(data)
				setPopperContext('Success!')
			})
			.catch((err) => {
				console.error(err)
				setPopperContext('Fail!')
			})
			.finally(() => {
				setAnchorEl(e.currentTarget)
			})
	}

	const open = Boolean(anchorEl)
	const id = open ? 'log' : undefined

	return (
		<>
			<Button
				variant="contained"
				sx={{
					padding: '1rem 3rem',
					fontSize: '1.5rem',
					fontWeight: 'bold',
					bgcolor: '#fff',
					borderRadius: '3rem',
					textTransform: 'none',
					'&:hover': {
						bgcolor: '#ddd',
					},
				}}
				onClick={handleClick}
			>
				{content}
			</Button>
			<Popper id={id} open={open} anchorEl={anchorEl}>
				<Box sx={{ border: 1, p: 1, bgcolor: '#fff' }}>{popperContext}</Box>
			</Popper>
		</>
	)
}
