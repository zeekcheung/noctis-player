import { Container } from '../Home'
import { useCatlist } from '../../../api/playlist'
import { FullSizeError, FullSizeLoading } from '../../../components/lib'
import { Genre } from './Genre'

export default function Search() {
	const { data: catlist, error, isLoading, isError } = useCatlist()

	return isLoading ? (
		<FullSizeLoading />
	) : isError ? (
		<FullSizeError error={error} />
	) : (
		<Container>
			<Genre catlist={catlist} />
		</Container>
	)
}
