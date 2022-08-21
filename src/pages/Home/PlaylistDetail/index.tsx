import { useParams } from 'react-router-dom'
import { Tab } from '../../../components/Tab'
import { Header } from './Header'
import { PlaylistTable } from './PlaylistTable'
import { useAllSongs, usePlaylist } from '../../../hooks/playlist'

export default function PlaylistDetail() {
	const { id } = useParams<{ id: string }>()
	const {
		data: playlist,
		error: playlistError,
		isLoading: playlistIsLoading,
		isError: playlistIsError,
	} = usePlaylist(id || '')
	const {
		data: songs,
		error: songsError,
		isLoading: songsIsLoading,
		isError: songsIsError,
	} = useAllSongs(id || '')

	return (
		<Tab
			isLoading={playlistIsLoading || songsIsLoading}
			isError={playlistIsError || songsIsError}
			error={playlistError || songsError}
		>
			{playlist && <Header playlist={playlist} />}
			{songs && <PlaylistTable songs={songs} />}
		</Tab>
	)
}
