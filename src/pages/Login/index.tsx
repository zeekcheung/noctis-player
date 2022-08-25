import { MouseEventHandler, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'contexts/AuthProvider'
import { useSnackbar } from 'contexts/SnackbarProvider'
import {
	Container,
	Divider,
	Footer,
	Form,
	Input,
	LoginButton,
	Logo,
	RememberMe,
} from './lib'

export default function Login() {
	const phoneRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	const { login } = useAuth()
	const { openSnackbar, closeSnackbar, setMessage } = useSnackbar()
	const navigate = useNavigate()

	const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
		const phone = phoneRef.current?.value
		const password = passwordRef.current?.value

		if (phone && password) {
			e.preventDefault()
			login(phone, password)
				.then(() => navigate('/'))
				.catch((err) => {
					openSnackbar()
					setMessage(`${err.code}: ${err.message}`)
				})
		}
	}

	useEffect(() => {
		setMessage('请使用网易云音乐账号登录~')
		openSnackbar()

		return () => {
			setMessage('')
			closeSnackbar()
		}
	}, [closeSnackbar, openSnackbar, setMessage])

	return (
		<Container>
			<Form>
				<Logo />
				<Divider>Login</Divider>
				<Input
					inputRef={phoneRef}
					id={'phone'}
					label={'Phone'}
					type={'tel'}
					autoComplete={'username'}
					autoFocus
				/>
				<Input
					inputRef={passwordRef}
					id={'password'}
					label={'Password'}
					type={'password'}
					autoComplete={'current-password'}
				/>
				<Footer>
					<RememberMe />
					<LoginButton onClick={handleClick} />
				</Footer>
			</Form>
		</Container>
	)
}
