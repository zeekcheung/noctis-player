import { Playlist } from '../../../types/playlist'
import { Box } from '@mui/system'
import styled from '@emotion/styled'
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Link,
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
					<PlaylistCard playlist={playlist} />
				))}
			</Main>
		</Container>
	)
}

export const Container = styled(Box)`
	flex: 0 0 auto;
`

export const Title = ({ title }: { title: string }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				padding: '1.5em 2em 2em',
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
			<Link>SEE ALL</Link>
		</Box>
	)
}

export const PlaylistCard = ({ playlist }: { playlist: Playlist }) => {
	const { coverImgUrl, name, description } = playlist
	return (
		<Card
			sx={{
				/*maxWidth: "calc((100% - 10rem) / 4)" */
				width: '12rem',
				margin: '0 1.5rem',
			}}
		>
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
	display: flex;
	flex-flow: row wrap;
	justify-content: space-evenly;
	padding: 0 1rem 1rem;
`
