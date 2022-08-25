import { useParams } from 'react-router-dom'
import { Tab } from '../../../components/Tab'
import { useAllTracks, usePlaylist } from '../../../hooks/playlist'
import { AudioControl } from './AudioControl'
import { Header } from './Header'
import { PlaylistTable } from './PlaylistTable'

export default function PlaylistDetail() {
	const { id } = useParams<{ id: string }>()
	const {
		data: playlist,
		error: playlistError,
		isLoading: playlistIsLoading,
		isError: playlistIsError,
	} = usePlaylist(id || '')
	const {
		data: tracks,
		error: tracksError,
		isLoading: tracksIsLoading,
		isError: tracksIsError,
	} = useAllTracks(id || '')

	return (
		<Tab
			isLoading={playlistIsLoading || tracksIsLoading}
			isError={playlistIsError || tracksIsError}
			error={playlistError || tracksError}
		>
			{playlist && <Header playlist={playlist} />}
			{tracks && <PlaylistTable tracks={tracks} />}
			{tracks && <AudioControl tracks={tracks} />}
		</Tab>
	)
}
