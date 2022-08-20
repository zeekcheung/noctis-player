import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import { Main } from '../Home/Gallery'
import { Box } from '@mui/system'
import { getBgcolorByIndex } from '../../../themes'
import { fetchPlayLists } from '../../../api/playlist'
import { Cat } from '../../../types/playlist'

export const Genre = ({ catlist }: { catlist: string[] }) => {
	return (
		<Container>
			<Title />
			<Main>
				{catlist.map((cat, index) => (
					<GenreCard cat={cat} key={cat} index={index} />
				))}
			</Main>
		</Container>
	)
}

export const Container = styled.div``

export const Title = () => {
	return (
		<Typography
			variant={'h2'}
			sx={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '1.2rem' }}
		>
			Browse all
		</Typography>
	)
}

interface ICard {
	index: number
}

interface IGenreCard extends ICard {
	cat: Cat
}

export const GenreCard = ({ cat, index }: IGenreCard) => {
	const handleClick = () => {
		console.log(cat)
		fetchPlayLists(cat).then((playlist) => console.log(playlist))
	}
	return (
		<Card index={index} onClick={handleClick}>
			<CardTitle cat={cat} />
		</Card>
	)
}

export const Card = styled(Box)`
	width: 13rem;
	height: 13rem;
	background-color: ${({ index }: ICard) => getBgcolorByIndex(index)};
	border-radius: 0.5rem;
	padding: 1rem;
	position: relative;
	overflow: hidden;

	&:hover {
		cursor: pointer;
	}

	&::after {
		display: block;
		content: '';
		width: 6rem;
		height: 6rem;
		background-color: ${({ index }: ICard) => getBgcolorByIndex(index + 1)};
		transform: rotate(30deg);
		position: absolute;
		right: -1rem;
		bottom: -1rem;
	}
`

export const CardTitle = ({ cat }: { cat: Cat }) => {
	return (
		<Typography
			variant={'h3'}
			color={'#000'}
			fontSize={'1.5rem'}
			fontWeight={'700'}
		>
			{cat}
		</Typography>
	)
}
