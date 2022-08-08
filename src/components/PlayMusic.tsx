import { Button } from '@mui/material'
import { useMemo } from 'react'

export const Demo = () => {
	const audioElement = useMemo(
		() =>
			new Audio('https://music.163.com/song/media/outer/url?id=562598081.mp3'),
		[]
	)

	const handlePlay = () => {
		audioElement.play()
	}

	return (
		<div>
			<Button onClick={handlePlay}>play</Button>
		</div>
	)
}
