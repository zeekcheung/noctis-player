import styled from '@emotion/styled'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import { ButtonGroup, Divider, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { CustomLink, StyledFlexBox } from '../lib'

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
						<FooterLink>{link}</FooterLink>
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
					<FooterLink fontSize={'.9em'}>{link}</FooterLink>
				</li>
			))}
		</Ul>
	)
}

export const Ul = styled.ul`
	list-style: none;
	display: flex;
`

export const FooterTopBox = styled(StyledFlexBox)`
	align-items: flex-start;
	flex-wrap: wrap;
	padding: 2em 0;
`

export const FooterBottomBox = styled(StyledFlexBox)`
	align-items: normal;
	padding-top: 2rem;
`

export const FooterLink = styled(CustomLink)`
	padding-top: 1em;
	padding-right: 1rem;
`
