import { AuthProvider } from './contexts/AuthProvider'
import { SnackbarProvider } from './contexts/SnackbarProvider'
import { Router } from './routes'
import { ThemesProvider } from './themes'

function App() {
	return (
		<ThemesProvider>
			<AuthProvider>
				<SnackbarProvider>
					<Router />
				</SnackbarProvider>
			</AuthProvider>
		</ThemesProvider>
	)
}

export default App
