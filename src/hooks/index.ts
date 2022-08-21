// 组件挂载时指定回调
import { useEffect } from 'react'

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
