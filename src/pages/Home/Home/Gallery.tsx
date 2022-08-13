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
	const { coverImgUrl, name, description } = playlist
	return (
		<Card>
			<CardActionArea>
				<CardMedia
					component={'img'}
					height={'140'}
					image={coverImgUrl}
					alt={name}
				/>
				<CardContent sx={{ bgcolor: '' }}>
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
						{name}
					</Typography>
					<Typography
						variant={'body2'}
						sx={{
							fontWeight: '200',
							height: '2.8em',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}
					>
						{description}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}

export const Main = styled.main`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(9rem, 12rem));
	grid-gap: 3rem;
	//justify-content: center;
	padding: 1.5rem 0;
`
