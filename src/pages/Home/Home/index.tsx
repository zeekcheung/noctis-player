import { Gallery } from './Gallery'
import { Tab } from '../../../components/Tab'
import { cats } from '../../../types/playlist'
import { useAllPlaylists } from '../../../hooks/playlist'

export default function Home() {
	const { data: allPlaylists, isLoading, isError, error } = useAllPlaylists()

	return (
		<Tab isLoading={isLoading} isError={isError} error={error}>
			{(allPlaylists || []).map((playlists, index) => (
				<Gallery
					title={cats[index] + '推荐歌单'}
					playlists={playlists}
					key={index}
				/>
			))}
		</Tab>
	)
}
