import styled from '@emotion/styled'
import {
	Box,
	ButtonGroup,
	Card,
	CardMedia,
	IconButton,
	Typography,
} from '@mui/material'
import { Playlist } from 'types/playlist'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import { StyledFlexBox } from 'components/lib'
import { useAudio } from 'contexts/AudioProvider'
import { isPlayingChanged, trackIndexChanged } from 'store/audio/actions'

export const Header = ({ playlist }: { playlist: Playlist }) => {
	const {
		name,
		coverImgUrl,
		description,
		userId,
		subscribedCount,
		trackCount,
		playCount,
	} = playlist

	const { dispatch } = useAudio()

	// 播放歌单
	const handlePlayClick = () => {
		// 重置 trackIndex
		dispatch(trackIndexChanged(0))
		// 设置 isPlaying
		dispatch(isPlayingChanged(true))
	}

	// 收藏/取消收藏歌单
	const handleCollectClick = () => {}

	return (
		<Container>
			<Card
				sx={{
					display: 'flex',
					background: 'none',
				}}
			>
				<CardMedia
					component={'img'}
					sx={{
						minWidth: 192,
						width: 192,
						height: 192,
						marginInlineEnd: '24px',
						boxShadow: '0 4px 60px rgba(0,0,0,.5)',
						marginTop: '8px',
					}}
					image={coverImgUrl}
					alt={name}
				/>
				<Box>
					<PlaylistText />
					<Name content={name} />
					<Box>
						<Description content={description} />
						<StyledFlexBox>
							<Typography variant={'body2'}>
								{`by ${userId} · ${trackCount} tracks · ${subscribedCount} likes · ${playCount} plays`}
							</Typography>
							<ButtonGroup>
								<IconButton onClick={handlePlayClick}>
									<PlayCircleIcon />
								</IconButton>
								<IconButton onClick={() => console.log('收藏')}>
									<FavoriteBorderIcon />
								</IconButton>
								<IconButton onClick={() => console.log('...')}>
									<MoreHorizIcon />
								</IconButton>
							</ButtonGroup>
						</StyledFlexBox>
					</Box>
				</Box>
			</Card>
		</Container>
	)
}

const Container = styled(Box)``

const PlaylistText = () => {
	return (
		<Typography
			variant={'h2'}
			sx={{
				fontWeight: 700,
				fontSize: '.75rem',
				marginTop: '4px',
				textTransform: 'uppercase',
			}}
		>
			playlist
		</Typography>
	)
}

const Name = ({ content }: { content: string }) => {
	return (
		<Typography
			variant={'h1'}
			sx={{
				width: '9em',
				lineHeight: 'normal',
				marginTop: '8px',
				marginBottom: '.4em',
				overflow: 'hidden',
				wordBreak: 'break-word',
				whiteSpace: 'nowrap',
				textOverflow: 'ellipsis',
				fontSize: '4.5rem',
				fontWeight: 900,
			}}
		>
			{content}
		</Typography>
	)
}

const Description = ({ content }: { content: string }) => {
	return (
		<Typography
			variant={'body1'}
			sx={{
				width: '25em',
				height: '1.5rem',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
				whiteSpace: 'nowrap',
				// fontSize: '1rem',
				// fontWeight: '400',
				color: '#b3b3b3',
			}}
		>
			{content}
		</Typography>
	)
}
