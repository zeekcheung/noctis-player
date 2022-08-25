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

export const audioReducer = (
	state: IAudioState,
	action: IAudioAction
): IAudioState => {
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

export const audioInitialState: IAudioState = {
	trackIndex: 0,
	trackProgress: 0,
	isPlaying: false,
	playMode: 'loop',
}
