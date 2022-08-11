import React, { ReactNode } from 'react'
import { FullSizeError } from './lib'

export default class ErrorBoundary extends React.Component<
	{ children: ReactNode },
	{ error: Error | null }
> {
	constructor(props: any) {
		super(props)
		this.state = {
			error: null,
		}
	}

	static getDerivedStateFromError(error: Error) {
		return { error }
	}

	componentDidCatch(error: Error, errorInfo: any) {
		console.log(error)
	}

	render(): React.ReactNode {
		return this.state.error ? (
			<FullSizeError error={this.state.error} />
		) : (
			this.props.children
		)
	}
}
