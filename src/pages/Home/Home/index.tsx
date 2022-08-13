import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { ReactNode, useEffect } from 'react'
import { cats, useAllPlaylists } from '../../../api/playlist'
import { FullSizeLoading } from '../../../components/lib'
import { Gallery } from './Gallery'

export default function Index() {
	const { data: allPlaylists, isLoading, isError, error } = useAllPlaylists()

	useEffect(() => {
		console.log(allPlaylists)
	}, [allPlaylists])

	return isLoading ? (
		<FullSizeLoading />
	) : isError ? (
		<Typography>{error?.message}</Typography>
	) : (
		<Container>
			{allPlaylists.map((playlists, index) => (
				<Gallery
					title={cats[index] + '推荐歌单'}
					playlists={playlists}
					key={index}
				/>
			))}
		</Container>
	)
}

export const Container = ({ children }: { children: ReactNode }) => {
	return (
		<Box
			sx={{
				bgcolor: '#121212',
				color: '#fff',
				display: 'flex',
				flexDirection: 'column',
				flex: 1,
				overflow: 'overlay',
				padding: '1.5rem 2rem',
			}}
			children={children}
		/>
	)
}
