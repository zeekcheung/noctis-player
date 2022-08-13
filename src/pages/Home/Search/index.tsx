import { Container } from '../Home'
import { useCatlist } from '../../../api/playlist'
import { FullSizeError, FullSizeLoading } from '../../../components/lib'
import { useEffect } from 'react'
import { Genre } from './Genre'

export default function Search() {
	const { data: catlist, error, isLoading, isError } = useCatlist()

	useEffect(() => {
		console.log(catlist)
	}, [catlist])

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
