import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material/styles'
import { ReactNode } from 'react'
import { grey } from '@mui/material/colors'

export const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#B3B3B3',
		},
		background: {
			default: '#000',
			paper: '#121212',
		},
		text: {
			primary: '#fff',
			secondary: grey[500],
		},
	},
})

export const ThemesProvider = ({ children }: { children: ReactNode }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
