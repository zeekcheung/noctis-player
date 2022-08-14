import { useCatlist } from '../../../api/playlist'
import { Genre } from './Genre'
import { Tab } from '../../../components/Tab'

export default function Search() {
	const { data: catlist, error, isLoading, isError } = useCatlist()

	return (
		<Tab isLoading={isLoading} isError={isError} error={error}>
			<Genre catlist={catlist || []} />
		</Tab>
	)
}
