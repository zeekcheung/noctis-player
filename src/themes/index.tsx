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

// export const bgcolors = ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const
export const bgcolors = [
	'#42a5f5',
	'#ab47bc',
	'#d32f2f',
	'#f57c00',
	'#0288d1',
	'#388e3c',
] as const

export const getBgcolorByIndex = (index: number) =>
	bgcolors[Math.floor(index % bgcolors.length)]
