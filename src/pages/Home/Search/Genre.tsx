import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import { Main } from '../Home/Gallery'
import { Box } from '@mui/system'
import { bgcolors } from '../../../themes'

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

export const GenreCard = ({ cat, index }: { cat: string; index: number }) => {
	return (
		<Box
			sx={{
				width: '13rem',
				height: '13rem',
				bgcolor: bgcolors[Math.floor(index % bgcolors.length)],
				borderRadius: '.5rem',
				padding: '1rem',
				position: 'relative',
				overflow: 'hidden',
				'&:hover': {
					cursor: 'pointer',
				},
				'&::after': {
					display: 'box',
					content: '""',
					width: '6rem',
					height: '6rem',
					bgcolor: bgcolors[Math.floor((index + 1) % bgcolors.length)],
					transform: 'rotate(30deg)',
					position: 'absolute',
					right: '-1rem',
					bottom: '-1rem',
				},
			}}
		>
			<Typography
				variant={'h3'}
				color={'#000'}
				fontSize={'1.5rem'}
				fontWeight={'700'}
			>
				{cat}
			</Typography>
		</Box>
	)
}
