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

// 格式化歌曲时长
export const formatSongLength = (dt: number) => {
	dt /= 1000
	const m = Math.floor(dt / 60)
	const s = Math.floor(dt % 60)

	return `${m}:${s < 10 ? `0${s}` : s}`
}
