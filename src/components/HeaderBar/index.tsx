import {
	BoxProps,
	Button,
	ButtonGroup,
	ButtonProps,
	SvgIcon,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useAuth, useUser } from '../../contexts/AuthProvider'
import { useSnackbar } from '../../contexts/SnackbarProvider'
import { useNavigate } from 'react-router-dom'
import { StyledFlexBox } from '../lib'
import { useQueryClient } from '@tanstack/react-query'

export const HeaderBar = () => {
	return (
		<Container>
			<ButtonGroup>
				<NavigateButton Icon={ChevronLeftIcon} type={'back'} />
				<NavigateButton Icon={ChevronRightIcon} type={'forward'} />
			</ButtonGroup>
			<LogButton />
		</Container>
	)
}

const Container = (props: BoxProps) => {
	return (
		<StyledFlexBox
			sx={{
				bgcolor: '#090909',
				opacity: 0.8,
				height: '4rem',
				padding: '.5rem 1.5rem',
				position: 'absolute',
				left: 0,
				right: 0,
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
	const queryClient = useQueryClient()

	const handleClick = () => {
		if (type === 'forward') {
			window.history.forward()
		}
		window.history.back()

		// 退出详情页时清除缓存
		queryClient.removeQueries(['playlist'])
		queryClient.removeQueries(['allTracks'])
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

const LogBaseButton = (props: ButtonProps) => {
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
