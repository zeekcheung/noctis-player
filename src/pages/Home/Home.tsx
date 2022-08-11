import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { ReactNode, useEffect } from 'react'
import { useAllPlaylists } from '../../api/playlist'
import { FullSizeLoading } from '../../components/lib'

export default function Home() {
	const { data: allPlaylists, isLoading, isError, error } = useAllPlaylists()

	useEffect(() => {
		console.log(allPlaylists)
	}, [allPlaylists])

	return isLoading ? (
		<FullSizeLoading />
	) : isError ? (
		<Typography>{'error'}</Typography>
	) : (
		<Container>home</Container>
	)
}

export const Container = ({ children }: { children: ReactNode }) => {
	return (
		<Box
			sx={{
				height: `calc(100% - 4rem)`,
				bgcolor: '#121212',
				color: '#fff',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
			children={children}
		/>
	)
}
