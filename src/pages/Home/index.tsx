import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { SideBar } from '../../components/SideBar'
import { HeaderBar } from '../../components/HeaderBar'

export default function Home() {
	return (
		<Container>
			<SideBar />
			<Main>
				<HeaderBar />
				<Outlet />
			</Main>
		</Container>
	)
}

const Container = styled(Box)`
	width: 100vw;
	height: 100vh;
	display: flex;
`

const Main = styled.main`
	flex: 1;
	display: flex;
	flex-direction: column;
	position: relative;
`
