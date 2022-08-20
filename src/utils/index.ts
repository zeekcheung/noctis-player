import { useEffect } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const fromNow = (timestamp: string | number) => {
	const date = dayjs(Number(timestamp))
	return dayjs(date).fromNow()
}

// 从对象 o 中提取目标属性
export const extractProps = (o: Object, keys: string[]) => {
	const entries = Object.entries(o).filter(([key, _]) => keys.includes(key))
	return Object.fromEntries(entries)
}

// 防抖
export const debounce = <T = HTMLElement>(fn: Function, delay: number) => {
	let timer: NodeJS.Timeout
	return function (this: T) {
		const _arguments = arguments
		timer && clearTimeout(timer)

		timer = setTimeout(() => {
			fn.apply(this, _arguments)
		}, delay)
	}
}

function fn(e: Event) {
	console.log('scroll', e)
}

export const addScrollEvent = () => {
	document.body.addEventListener('scroll', debounce(fn, 1000))
}

export const removeScrollEvent = () => {
	document.body.removeEventListener('scroll', fn)
}

// 组件挂载时指定回调
export const useMount = (onMount: () => void, onUnmount?: () => void) => {
	useEffect(() => {
		onMount()

		if (onUnmount) {
			return () => {
				onUnmount()
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
