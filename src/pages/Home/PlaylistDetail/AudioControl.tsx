import styled from '@emotion/styled'
import {
	Box,
	ButtonGroup,
	IconButton,
	LinearProgress,
	Typography,
	TypographyProps,
} from '@mui/material'
import { ReactComponent as LoopIcon } from 'assets/loop.svg'
import { ReactComponent as NextIcon } from 'assets/next.svg'
import { ReactComponent as PauseIcon } from 'assets/pause.svg'
import { ReactComponent as PlayIcon } from 'assets/play.svg'
import { ReactComponent as PrevIcon } from 'assets/previous.svg'
import { ReactComponent as ShuffleIcon } from 'assets/shuffle.svg'
import { ReactComponent as VolumeIcon } from 'assets/volume.svg'
import { ChangeEvent, useEffect, useMemo } from 'react'
import { fetchTrackUrl } from 'api/playlist'
import { StyledFlexBox } from 'components/lib'
import {
	isPlayingChanged,
	modeChanged,
	progressChanged,
	trackIndexChanged,
} from 'store/audio/actions'
import { Track } from 'types/playlist'
import { getRandomIndex } from 'utils'
import { TableTitle } from './PlaylistTable'
import { useAudio } from 'contexts/AudioProvider'
import { formatTrackDuration } from 'utils/format'

interface IAudioControl {
	tracks: Track[]
}

export const AudioControl = ({ tracks }: IAudioControl) => {
	const { state, dispatch, audioRef, intervalRef } = useAudio()
	const { trackIndex, isPlaying, playMode } = state

	// 开启定时器，控制播放进度和自动播放下一首
	const startTimer = () => {
		// 先清除上一首音乐的定时器
		clearInterval(intervalRef.current)

		// 设置新的定时器，每秒更新播放进度
		intervalRef.current = setInterval(() => {
			const { ended, currentTime } = audioRef.current

			ended
				? toNextTrack() // 播放结束，继续播放下一首
				: dispatch(progressChanged(currentTime)) // 未播放结束，更新播放进度
		}, 1000)
	}

	const handlePlayPauseClick =
		(playFlag: boolean = true) =>
		() =>
			dispatch(isPlayingChanged(playFlag))

	useEffect(() => {
		if (isPlaying) {
			// audio.play() 是异步的，会返回一个 Promise
			audioRef.current
				.play()
				.then((_) => {
					startTimer()
				})
				.catch((err) => console.error(err))
		} else {
			// 暂停播放音乐，并取消定时器
			audioRef.current.pause()
			clearInterval(intervalRef.current)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPlaying])

	useEffect(() => {
		// 组件卸载时，暂停播放，清除定时器
		return () => {
			audioRef.current.pause()
			clearInterval(intervalRef.current)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		// 先暂停播放上一首音乐
		audioRef.current.pause()

		fetchTrackUrl(tracks[trackIndex].id)
			.then((url) => {
				// 更新 Audio 实例
				audioRef.current = new Audio(url)
				// 继续播放下一首音乐，并更新进度
				dispatch(progressChanged(audioRef.current.currentTime))
				audioRef.current
					.play()
					.then((_) => startTimer())
					.catch((err) => console.error(err))
			})
			.catch((err) => {
				console.error(err)
				toNextTrack()
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trackIndex])

	const handleShuffle = () => {
		dispatch(modeChanged('shuffle'))
	}

	const handleLoop = () => {
		dispatch(modeChanged('loop'))
	}

	const toPrevTrack = () => {
		dispatch(
			trackIndexChanged(
				playMode === 'shuffle'
					? getRandomIndex(0, tracks.length - 1)
					: (trackIndex + 49) % tracks.length
			)
		)
	}

	const toNextTrack = () => {
		dispatch(
			trackIndexChanged(
				playMode === 'shuffle'
					? getRandomIndex(0, tracks.length - 1)
					: (trackIndex + 1) % tracks.length
			)
		)
	}

	return (
		<Container>
			<Left>
				<TableTitle track={tracks[trackIndex]} />
			</Left>
			<Main>
				<ButtonGroup>
					<IconButton onClick={handleShuffle}>
						<ShuffleIcon />
					</IconButton>
					<IconButton onClick={toPrevTrack}>
						<PrevIcon />
					</IconButton>
					<IconButton onClick={handlePlayPauseClick(!isPlaying)}>
						{isPlaying ? <PauseIcon /> : <PlayIcon />}
					</IconButton>
					<IconButton onClick={toNextTrack}>
						<NextIcon />
					</IconButton>
					<IconButton onClick={handleLoop}>
						<LoopIcon />
					</IconButton>
				</ButtonGroup>
				<ProgressBar startTimer={startTimer} />
			</Main>
			<Right>
				<VolumeBar />
			</Right>
		</Container>
	)
}

const ProgressBar = ({ startTimer }: ITrackProgress) => {
	const { state, audioRef } = useAudio()
	const { trackProgress } = state
	const { duration } = audioRef.current

	const formattedTime = useMemo(
		() => formatTrackDuration(trackProgress * 1000),
		[trackProgress]
	)
	const formattedDuration = useMemo(
		() => formatTrackDuration((duration || trackProgress) * 1000),
		[duration, trackProgress]
	)

	return (
		<StyledFlexBox sx={{ width: '100%' }}>
			<ProgressLabel>{formattedTime}</ProgressLabel>
			<TrackProgress startTimer={startTimer} />
			<ProgressLabel>{formattedDuration}</ProgressLabel>
		</StyledFlexBox>
	)
}

const ProgressLabel = (props: TypographyProps) => {
	return <Typography variant={'body2'} {...props} />
}

interface ITrackProgress {
	startTimer: () => void
}

const TrackProgress = ({ startTimer }: ITrackProgress) => {
	const { state, dispatch, audioRef, intervalRef } = useAudio()
	const { duration } = audioRef.current

	const currentPercentage = duration
		? `${(state.trackProgress / duration) * 100}%`
		: '0%'
	const trackStyle = {
		background: `
			-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
		`,
		flex: '1',
	}

	const onScrub = (e: ChangeEvent<HTMLInputElement>) => {
		// 清除定时器
		clearInterval(intervalRef.current)
		// 更新播放位置
		audioRef.current.currentTime = Number(e.target.value)
		dispatch(progressChanged(audioRef.current.currentTime))
	}

	const onScrubEnd = () => {
		// 如果当前未在播放，则进行播放
		if (!state.isPlaying) {
			dispatch(isPlayingChanged(true))
		}
		// 重新开启定时器
		startTimer()
	}

	return (
		<RangeInput
			type={'range'}
			min={0}
			max={duration || `${duration}`}
			step={1}
			value={state.trackProgress}
			onChange={onScrub}
			onMouseUp={onScrubEnd}
			onKeyUp={onScrubEnd}
			style={trackStyle}
		/>
	)
}

const VolumeBar = () => {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', flex: '0 1 150px' }}>
			<IconButton
				sx={{
					width: '32px',
					minWidth: '32px',
					height: '32px',
					color: 'hsla(0, 0%, 100%, .7)',
					border: 'none',
					bgcolor: 'transparent',
				}}
			>
				<VolumeIcon />
			</IconButton>
			<LinearProgress sx={{ width: '100%', position: 'relative' }} />
		</Box>
	)
}

const Container = styled(StyledFlexBox)`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 60px;
	padding: 16px;
	background-color: #181818;
`

const Left = styled.div`
	width: 30%;
	min-width: 180px;
`

const Main = styled.main`
	width: 40%;
	max-width: 722px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const Right = styled.div`
	width: 30%;
	min-width: 180px;
	display: flex;
	justify-content: flex-end;
`

const RangeInput = styled.input`
	height: 4px;
	background: #3b7677;
	transition: background 0.2s ease;
	cursor: pointer;
`
