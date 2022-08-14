import { Playlist } from '../../../types/playlist'
import { Box } from '@mui/system'
import styled from '@emotion/styled'
import {
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface IGallery {
	title: string
	playlists: Playlist[]
}

export const Gallery = ({ title, playlists }: IGallery) => {
	return (
		<Container>
			<Title title={title} />
			<Main>
				{playlists.map((playlist) => (
					<PlaylistCard playlist={playlist} key={playlist.id} />
				))}
			</Main>
		</Container>
	)
}

export const Container = styled(Box)`
	width: 100%;
`

export const Title = ({ title }: { title: string }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
			}}
		>
			<Typography
				variant={'h2'}
				sx={{
					fontSize: '1.3rem',
					fontWeight: '700',
				}}
			>
				{title}
			</Typography>
			<Button variant={'text'}>SEE ALL</Button>
		</Box>
	)
}

export const PlaylistCard = ({ playlist }: { playlist: Playlist }) => {
	const { coverImgUrl, name, description, id } = playlist
	const navigate = useNavigate()

	const handleClick = () => {
		navigate(`/playlistDetail/${id}`)
	}

	return (
		<Card onClick={handleClick}>
			<CardActionArea>
				<CardMedia
					component={'img'}
					height={'140'}
					image={coverImgUrl}
					alt={name}
				/>
				<CardContent sx={{ bgcolor: '' }}>
					<PlaylistCardTitle title={name} />
					<PlaylistCardContent content={description} />
				</CardContent>
			</CardActionArea>
		</Card>
	)
}

export const PlaylistCardTitle = ({ title }: { title: string }) => {
	return (
		<Typography
			gutterBottom
			variant={'h3'}
			sx={{
				fontSize: '1.2rem',
				height: '1em',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
			}}
		>
			{title}
		</Typography>
	)
}

export const PlaylistCardContent = ({ content }: { content: string }) => {
	return (
		<Typography
			variant={'body2'}
			sx={{
				fontWeight: '200',
				height: '2.8em',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
			}}
		>
			{content}
		</Typography>
	)
}

export const Main = styled.main`
	display: grid;
	grid-template-columns: repeat(auto-fill, 12rem);
	grid-gap: 2rem;
	justify-content: space-around;
	padding: 1.5rem 0;
`
