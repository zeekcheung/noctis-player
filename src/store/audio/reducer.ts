import { useMemo, useReducer, useRef } from 'react'

export interface IAudioState {
	// 当前播放音乐的索引
	trackIndex: number
	// 播放进度
	trackProgress: number
	// 正在播放或暂停播放
	isPlaying: boolean
	// 播放音乐的模式
	playMode: 'shuffle' | 'loop'
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface IAudioAction<P = any> {
	type:
		| 'ToPreviousTrack'
		| 'ToNextTrack'
		| 'TrackIndexChanged'
		| 'ProgressChanged'
		| 'IsPlayingChanged'
		| 'ModeChanged'
	payload?: any
}

const reducer = (state: IAudioState, action: IAudioAction): IAudioState => {
	switch (action.type) {
		case 'IsPlayingChanged':
			return {
				...state,
				isPlaying: action.payload,
			}
		case 'ProgressChanged':
			return {
				...state,
				trackProgress: action.payload,
			}
		case 'ModeChanged':
			return {
				...state,
				playMode: action.payload,
			}
		case 'TrackIndexChanged':
			return {
				...state,
				trackIndex: action.payload,
			}
		default:
			return state
	}
}

const initialState: IAudioState = {
	trackIndex: 0,
	trackProgress: 0,
	isPlaying: false,
	playMode: 'loop',
}

export const useAudio = () => {
	// state
	const [state, dispatch] = useReducer(reducer, initialState)

	/* 使用 Ref 保存状态，避免不必要的重新渲染 */
	// 当前播放音乐的 Audio 实例
	const audioRef = useRef<HTMLAudioElement>(new Audio())
	// 当前播放音乐的 interval 定时器
	const intervalRef = useRef<NodeJS.Timer>()
	// 当前播放音乐是否已经准备完毕
	const isReadyRef = useRef(false)

	return {
		state,
		dispatch,
		audioRef: useMemo(() => audioRef, [audioRef]),
		intervalRef: useMemo(() => intervalRef, [intervalRef]),
		isReadyRef: useMemo(() => isReadyRef, [isReadyRef]),
	}
}
