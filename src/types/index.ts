import { FunctionComponent, ReactNode, SVGProps } from 'react'

export interface ProviderProps {
	children: ReactNode
}

export type PlainObject = { [key: string]: any }

export type Svg = FunctionComponent<
	SVGProps<SVGSVGElement> & { title?: string | undefined }
>
