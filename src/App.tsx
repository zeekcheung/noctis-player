import { AuthProvider } from './contexts/AuthProvider'
import { Router } from './routes'
import { ThemesProvider } from './themes'

function App() {
	return (
		<ThemesProvider>
			<AuthProvider>
				<Router />
			</AuthProvider>
		</ThemesProvider>
	)
}

export default App
