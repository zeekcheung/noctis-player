import { Box } from '@mui/system'
import { ReactNode } from 'react'

export default function Home() {
	return <Container>home</Container>
}

export const Container = ({ children }: { children: ReactNode }) => {
	return (
		<Box
			sx={{
				height: `calc(100% - 6.5rem)`,
				bgcolor: '#121212',
				color: '#fff',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
			children={children}
		/>
	)
}
