import {
	Slide,
	SlideProps,
	Snackbar,
	SnackbarOrigin,
	SnackbarProps,
} from '@mui/material'
import {
	createContext,
	Dispatch,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react'
import { ProviderProps } from '../types'

// todo 使用 useReducer 管理 snackbar 状态
interface ISnackbarContext extends SnackbarProps {
	openSnackbar: () => void
	closeSnackbar: () => void
	setMessage: Dispatch<React.SetStateAction<string>>
	setAnchorOrigin: Dispatch<React.SetStateAction<SnackbarOrigin | undefined>>
}

const snackbarContext = createContext<ISnackbarContext | null>(null)

export const SnackbarProvider = ({ children }: ProviderProps) => {
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
				// 使用 useMemo 和 useCallback 解决依赖循环问题
				anchorOrigin: useMemo(() => anchorOrigin, [anchorOrigin]),
				openSnackbar: useCallback(openSnackbar, []),
				closeSnackbar: useCallback(closeSnackbar, []),
				setMessage: useCallback(setMessage, [setMessage]),
				setAnchorOrigin: useCallback(setAnchorOrigin, [setAnchorOrigin]),
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
