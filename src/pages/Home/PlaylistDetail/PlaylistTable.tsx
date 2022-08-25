import {
	Box,
	Paper,
	styled,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'
import { CustomLink, FlexBox } from 'components/lib'
import { Column, Track } from 'types/playlist'
import { formatTrackDuration, fromNow } from 'utils/format'

import {
	isPlayingChanged,
	TrackIndex,
	trackIndexChanged,
} from 'store/audio/actions'
import { useAudio } from 'contexts/AudioProvider'

export const PlaylistTable = ({ tracks }: { tracks: Track[] }) => {
	const { dispatch } = useAudio()

	// fixme 双击播放音乐
	const handleDoubleClick = (trackIndex: TrackIndex) => () => {
		dispatch(trackIndexChanged(trackIndex))
		dispatch(isPlayingChanged(true))
	}

	return (
		<Paper sx={{ marginTop: '2rem', background: 'inherit' }}>
			<TableContainer>
				<Table aria-label="playlist table">
					<TableHead>
						<CustomTableRow
							sx={{ borderBottom: '1px solid rgba(81, 81, 81, 1)' }}
						>
							{columns.map((column) => (
								<CustomTableCell
									key={column.id}
									align={column.align}
									style={{ maxWidth: column.maxWidth }}
									sx={{
										paddingBottom: '.875em !important',
										marginBottom: '1.2em',
										fontSize: '.75rem',
										fontWeight: '600',
										letterSpacing: '.1em',
									}}
								>
									{column.label}
								</CustomTableCell>
							))}
						</CustomTableRow>
					</TableHead>
					<TableBody>
						{tracks?.map((track, index) => (
							<CustomTableRow
								hover
								tabIndex={-1}
								key={track.id}
								onDoubleClick={handleDoubleClick(index)}
							>
								{columns.map((column) => (
									<CustomTableCell key={column.id} align={column.align}>
										{column.format(track, index + 1)}
									</CustomTableCell>
								))}
							</CustomTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{/* <TablePagination /> */}
		</Paper>
	)
}

const Clock = () => (
	<svg
		role="img"
		height="16"
		width="16"
		viewBox="0 0 16 16"
		style={{ fill: 'currentcolor', transform: 'translateY(25%)' }}
	>
		<path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"></path>
		<path d="M8 3.25a.75.75 0 01.75.75v3.25H11a.75.75 0 010 1.5H7.25V4A.75.75 0 018 3.25z"></path>
	</svg>
)

const columns: readonly Column[] = [
	{
		id: '#',
		label: '#',
		align: 'center',
		format: (_: Track, index?: number) => (
			<Typography
				sx={{
					fontSize: '1rem',
					fontWeight: '400',
				}}
			>
				{index}
			</Typography>
		),
	},
	{
		id: 'TITLE',
		label: 'TITLE',
		align: 'left',
		format: (track: Track, _?: number) => <TableTitle track={track} />,
	},
	{
		id: 'ALBUM',
		label: 'ALBUM',
		align: 'left',
		format: (track: Track, _?: number) => <CustomLink>{track.name}</CustomLink>,
	},
	{
		id: 'DATE PUBLISHED',
		label: 'DATE PUBLISHED',
		align: 'left',
		format: (track: Track, _?: number) => fromNow(track.publishTime),
	},
	{
		id: '🕒',
		label: <Clock />,
		align: 'left',
		format: (track: Track) => formatTrackDuration(track.duration),
	},
]

export const TableTitle = ({ track }: { track: Track }) => {
	const { name, album, artist } = track

	return (
		<FlexBox>
			<Box
				sx={{
					width: '2.5rem',
					height: '2.5rem',
					background: `url(${album.picUrl})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: '100%',
				}}
			/>
			<Box sx={{ display: 'grid', gap: '0.3em', paddingLeft: '1em' }}>
				<CustomLink sx={{ color: '#fff' }}>{name}</CustomLink>
				<CustomLink sx={{ fontSize: '.9em' }}>{artist.name}</CustomLink>
			</Box>
		</FlexBox>
	)
}

const CustomTableCell = styled(TableCell)`
	font-family: var(--font-family, spotify-circular), Helvetica, Arial;
	border: none;
	padding-top: 0.8em;
	color: #b3b3b3 !important;
`

const CustomTableRow = styled(TableRow)`
	display: grid;
	grid-template-columns: 3em 4fr 3fr 3fr 1fr;
	align-items: center;
	grid-column-gap: 2em;

	& > * {
		padding: 0 !important;
	}

	& > td {
		padding-top: 0.8em !important;
	}
`
