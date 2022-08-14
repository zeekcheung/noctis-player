import styled from '@emotion/styled'
import {
	Box,
	ButtonProps,
	Checkbox,
	Divider as _Divider,
	FormControlLabel,
	TextField,
	TextFieldProps,
} from '@mui/material'
import { Logo as BaseLogo } from '../../components/Logo'

export const Container = styled(Box)`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
`

export const Form = styled.form`
	width: 28rem;
	height: 30rem;
	display: flex;
	flex-direction: column;
	align-items: center;
`

export const Logo = () => (
	<BaseLogo
		btnSx={{ color: '#000', margin: '1.5rem', fontSize: '2.4rem' }}
		iconSx={{ fontSize: '4rem' }}
	/>
)

export const Divider = styled(_Divider)`
	width: 100%;
	font-weight: 700;
	font-size: 1.2rem;
	margin-bottom: 1.5rem;
`

export const Input = (props: TextFieldProps) => {
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

export const Footer = styled.footer`
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding-top: 2rem;
`

export const RememberMe = () => {
	return (
		<FormControlLabel
			label={'Remember me'}
			control={<Checkbox color={'success'} defaultChecked />}
			sx={{ fontSize: '1.6rem', transform: 'translateY(-0.5rem)' }}
		/>
	)
}

export const Button = styled.button`
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

export const LoginButton = ({ onClick }: ButtonProps) => {
	return (
		<Button type={'submit'} onClick={onClick}>
			LOG IN
		</Button>
	)
}
