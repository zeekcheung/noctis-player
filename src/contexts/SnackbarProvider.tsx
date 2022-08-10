import {
	Slide,
	SlideProps,
	Snackbar,
	SnackbarOrigin,
	SnackbarProps,
} from '@mui/material'
import { createContext, Dispatch, ReactNode, useContext, useState } from 'react'

interface ISnackbarContext extends SnackbarProps {
	openSnackbar: () => void
	closeSnackbar: () => void
	setMessage: Dispatch<React.SetStateAction<string>>
	setAnchorOrigin: Dispatch<React.SetStateAction<SnackbarOrigin | undefined>>
}

const snackbarContext = createContext<ISnackbarContext | null>(null)

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
	const [open, setOpen] = useState(false)
	const [message, setMessage] = useState('')
	const [anchorOrigin, setAnchorOrigin] = useState<
		SnackbarProps['anchorOrigin']
	>({
		vertical: 'bottom',
		horizontal: 'center',
	})
	const openSnackbar = () => setOpen(true)
	const closeSnackbar = () => setOpen(false)

	const slideTransition = (props: SlideProps) => (
		<Slide {...props} direction={'up'} />
	)

	return (
		<snackbarContext.Provider
			value={{
				open,
				message,
				anchorOrigin,
				openSnackbar,
				closeSnackbar,
				setMessage,
				setAnchorOrigin,
			}}
		>
			{children}
			<Snackbar
				key={'log'}
				open={open}
				message={message}
				onClose={closeSnackbar}
				anchorOrigin={anchorOrigin}
				TransitionComponent={slideTransition}
			/>
		</snackbarContext.Provider>
	)
}

export const useSnackbar = () => {
	const value = useContext(snackbarContext)
	if (!value) {
		throw new Error('在当前组件树中无法匹配 snackbarContext!')
	}
	return { ...value }
}
