import { AuthProvider } from 'contexts/AuthProvider'
import { QueryProvider } from 'contexts/QueryProvider'
import { SnackbarProvider } from 'contexts/SnackbarProvider'
import { Router } from 'routes'
import { ThemesProvider } from 'themes'

function App() {
	return (
		<ThemesProvider>
			<QueryProvider>
				<AuthProvider>
					<SnackbarProvider>
						<AuthProvider>
							<Router />
						</AuthProvider>
					</SnackbarProvider>
				</AuthProvider>
			</QueryProvider>
		</ThemesProvider>
	)
}

export default App
