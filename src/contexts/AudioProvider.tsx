import {
	createContext,
	Dispatch,
	MutableRefObject,
	useContext,
	useMemo,
	useReducer,
	useRef,
} from 'react'
import {
	audioInitialState,
	audioReducer,
	IAudioAction,
	IAudioState,
} from 'store/audio/reducer'
import { ProviderProps } from 'types'

interface IAudioContext {
	state: IAudioState
	dispatch: Dispatch<IAudioAction>
	// 当前播放音乐的 Audio 实例
	audioRef: MutableRefObject<HTMLAudioElement>
	// 当前播放音乐的 interval 定时器
	intervalRef: MutableRefObject<NodeJS.Timer | undefined>
	// 当前播放音乐是否已经准备完毕
	isReadyRef: MutableRefObject<boolean>
}

const audioContext = createContext<IAudioContext | null>(null)

export const AudioProvider = (props: ProviderProps) => {
	// state
	const [state, dispatch] = useReducer(audioReducer, audioInitialState)

	/* 使用 Ref 保存状态，避免不必要的重新渲染 */
	const audioRef = useRef<HTMLAudioElement>(new Audio())
	const intervalRef = useRef<NodeJS.Timer>()
	const isReadyRef = useRef(false)

	return (
		<audioContext.Provider
			value={{
				state,
				dispatch,
				audioRef: useMemo(() => audioRef, [audioRef]),
				intervalRef: useMemo(() => intervalRef, [intervalRef]),
				isReadyRef: useMemo(() => isReadyRef, [isReadyRef]),
			}}
			{...props}
		/>
	)
}

export const useAudio = () => {
	const value = useContext(audioContext)
	if (!value) {
		throw new Error('当前组件树匹配不到 audioContext')
	}
	return { ...value }
}
