import { AuthProvider } from 'contexts/AuthProvider'
import { QueryProvider } from 'contexts/QueryProvider'
import { SnackbarProvider } from 'contexts/SnackbarProvider'
import { Router } from 'routes'
import { ThemesProvider } from 'themes'
import { AudioProvider } from 'contexts/AudioProvider'

function App() {
	return (
		<ThemesProvider>
			<QueryProvider>
				<AuthProvider>
					<SnackbarProvider>
						<AudioProvider>
							<Router />
						</AudioProvider>
					</SnackbarProvider>
				</AuthProvider>
			</QueryProvider>
		</ThemesProvider>
	)
}

export default App
