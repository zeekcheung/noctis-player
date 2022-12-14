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

// 获取 [min, max] 中的随机值
export const getRandomIndex = (min: number, max: number): number => {
	return min + Math.random() * (max - min)
}
