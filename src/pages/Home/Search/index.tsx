import { Genre } from './Genre'
import { Tab } from 'components/Tab'
import { useCatlist } from 'hooks/playlist'

export default function Search() {
	const { data: catlist, error, isLoading, isError } = useCatlist()

	return (
		<Tab isLoading={isLoading} isError={isError} error={error}>
			<Genre catlist={catlist || []} />
		</Tab>
	)
}
