import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material/styles'
import { ReactNode } from 'react'

export const theme = createTheme({
	palette: {
		primary: {
			main: '#B3B3B3',
		},
	},
})

export const ThemesProvider = ({ children }: { children: ReactNode }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
