import styled from '@emotion/styled'
import {
	Checkbox,
	Divider as _Divider,
	FormControlLabel,
	TextField,
	TextFieldProps,
} from '@mui/material'
import { Box } from '@mui/system'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthProvider'
import { useSnackbar } from '../../contexts/SnackbarProvider'
import { Logo as HomeLogo } from '../Home'

export default function Login() {
	const phoneRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	const { login } = useAuth()
	const { openSnackbar, setMessage } = useSnackbar()
	const navigate = useNavigate()

	const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
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

const Container = styled(Box)`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
`

const Form = styled.form`
	width: 28rem;
	height: 30rem;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const Logo = () => (
	<HomeLogo
		btnSx={{ color: '#000', margin: '1.5rem', fontSize: '2.4rem' }}
		iconSx={{ fontSize: '4rem' }}
	/>
)

const Divider = styled(_Divider)`
	width: 100%;
	font-weight: 700;
	font-size: 1.2rem;
	margin-bottom: 1.5rem;
`

const Input = (props: TextFieldProps) => {
	return (
		<TextField
			defaultValue={''}
			margin={'normal'}
			color={'info'}
			fullWidth
			required
			{...props}
		/>
	)
}

const Footer = styled.footer`
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding-top: 2rem;
`

const RememberMe = () => {
	return (
		<FormControlLabel
			label={'Remember me'}
			control={<Checkbox color={'success'} defaultChecked />}
			sx={{ fontSize: '1.6rem', transform: 'translateY(-0.5rem)' }}
		/>
	)
}

const Button = styled.button`
	background-color: #1ed760;
	border: none;
	padding: 1rem 2rem;
	border-radius: 3rem;
	font-weight: 700;
	letter-spacing: 2px;
	cursor: pointer;

	&:hover {
		color: white;
	}
`

const LoginButton = ({
	onClick,
}: {
	onClick: React.MouseEventHandler<HTMLButtonElement>
}) => {
	return (
		<Button type={'submit'} onClick={onClick}>
			LOG IN
		</Button>
	)
}
