import { ComponentProps, useEffect } from 'react'
import { FullSizeLoading } from '../lib'
import { Typography } from '@mui/material'
import { Container } from './Container'
import { addScrollEvent, removeScrollEvent } from 'utils'

interface ITab extends ComponentProps<typeof Container> {
	isLoading: boolean
	isError: boolean
	error: Error | null
}

export const Tab = (props: ITab) => {
	useEffect(() => {
		addScrollEvent()

		return () => {
			removeScrollEvent()
		}
	}, [])

	const { isLoading, isError, error, children } = props

	return isLoading ? (
		<FullSizeLoading />
	) : isError ? (
		<Typography>{error?.message}</Typography>
	) : (
		<Container children={children} />
	)
}
