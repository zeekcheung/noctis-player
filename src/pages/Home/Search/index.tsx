import { ContainerWithLoading } from '../Home'
import { useCatlist } from '../../../api/playlist'
import { Genre } from './Genre'

export default function Search() {
	const { data: catlist, error, isLoading, isError } = useCatlist()

	return (
		<ContainerWithLoading isLoading={isLoading} isError={isError} error={error}>
			<Genre catlist={catlist || []} />
		</ContainerWithLoading>
	)
}
