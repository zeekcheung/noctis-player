import { IAudioAction, IAudioState } from './reducer'

export const isPlayingChanged = (
	isPlaying: boolean
): IAudioAction<boolean> => ({
	type: 'IsPlayingChanged',
	payload: isPlaying,
})

export const progressChanged = (newProgress: number): IAudioAction<number> => ({
	type: 'ProgressChanged',
	payload: newProgress,
})

type PlayMode = IAudioState['playMode']
export const modeChanged = (mode: PlayMode): IAudioAction<PlayMode> => ({
	type: 'ModeChanged',
	payload: mode,
})

export type TrackIndex = IAudioState['trackIndex']
export const trackIndexChanged = (
	trackIndex: TrackIndex
): IAudioAction<TrackIndex> => ({
	type: 'TrackIndexChanged',
	payload: trackIndex,
})
