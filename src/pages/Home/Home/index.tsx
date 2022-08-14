import {
	ButtonGroup,
	Divider,
	IconButton,
	Link as MuiLink,
	Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { ReactNode } from 'react'
import { cats, useAllPlaylists } from '../../../api/playlist'
import { FullSizeLoading } from '../../../components/lib'
import { Gallery } from './Gallery'
import styled from '@emotion/styled'

import GitHubIcon from '@mui/icons-material/GitHub'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

export default function Home() {
	const { data: allPlaylists, isLoading, isError, error } = useAllPlaylists()

	return isLoading ? (
		<FullSizeLoading />
	) : isError ? (
		<Typography>{error?.message}</Typography>
	) : (
		<Container>
			{allPlaylists.map((playlists, index) => (
				<Gallery
					title={cats[index] + '推荐歌单'}
					playlists={playlists}
					key={index}
				/>
			))}
		</Container>
	)
}

export const Container = ({ children }: { children: ReactNode }) => {
	return (
		<Box
			sx={{
				bgcolor: '#121212',
				color: '#fff',
				display: 'flex',
				flexDirection: 'column',
				flex: 1,
				overflow: 'overlay',
				padding: '1.5rem 2rem',
			}}
		>
			{children}
			<Footer />
		</Box>
	)
}

export const Footer = () => {
	const topLinks = {
		Company: ['About', 'For the Record'],
		Communities: [
			'For Artists',
			'Developers',
			'Advertising',
			'Investors',
			'Vendors',
		],
		'Useful links': ['Support', 'Free Mobile App'],
	}
	const bottomLinks = [
		'Legal',
		'Privacy Center',
		'Privacy Policy',
		'Cookies',
		'About Ads',
	]

	const repoURL = 'https://github.com/zeekcheung/noctis-player'
	const gotoRepo = () => (window.location.href = repoURL)

	return (
		<Box sx={{ marginTop: '5rem' }}>
			<FooterTopBox>
				{Object.entries(topLinks).map(([title, linklist]) => (
					<TopLinkGroup key={title} title={title} linklist={linklist} />
				))}
				<ButtonGroup>
					<IconButton onClick={gotoRepo}>
						<GitHubIcon />
					</IconButton>
					<IconButton>
						<TwitterIcon />
					</IconButton>
					<IconButton>
						<LinkedInIcon />
					</IconButton>
				</ButtonGroup>
			</FooterTopBox>
			<Divider />
			<FooterBottomBox>
				<BottomLinkGroup linklist={bottomLinks} />
				<Typography variant={'body2'} paddingTop={'1em'}>
					© 2022 zeekcheung
				</Typography>
			</FooterBottomBox>
		</Box>
	)
}

export const TopLinkGroup = (props: { title: string; linklist: string[] }) => {
	const { title, linklist } = props
	return (
		<Box sx={{ width: '15rem' }}>
			<Typography
				variant={'h3'}
				sx={{
					fontSize: '1rem',
					fontWeight: '700',
				}}
			>
				{title}
			</Typography>
			<Ul style={{ flexDirection: 'column' }}>
				{linklist.map((link) => (
					<li key={link}>
						<Link>{link}</Link>
					</li>
				))}
			</Ul>
		</Box>
	)
}

export const BottomLinkGroup = ({ linklist }: { linklist: string[] }) => {
	return (
		<Ul>
			{linklist.map((link) => (
				<li key={link}>
					<Link fontSize={'.9em'}>{link}</Link>
				</li>
			))}
		</Ul>
	)
}

export const Ul = styled.ul`
	list-style: none;
	display: flex;
`

export const FooterTopBox = styled(Box)`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	flex-wrap: wrap;
	padding: 2em 0;
`

export const FooterBottomBox = styled(Box)`
	display: flex;
	justify-content: space-between;
	padding-top: 2rem;
`

export const Link = styled(MuiLink)`
	display: block;
	text-decoration-line: none;
	cursor: pointer;
	padding-top: 1em;
	padding-right: 1rem;
	font-family: var(--font-family, spotify-circular), Helvetica, Arial,
		sans-serif;

	&:hover {
		text-decoration-line: underline;
		color: #fff;
	}
`
