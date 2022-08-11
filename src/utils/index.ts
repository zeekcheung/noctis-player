// 从对象 o 中提取目标属性
export const extractProps = (o: Object, keys: string[]) => {
	const entries = Object.entries(o).filter(([key, _]) => keys.includes(key))
	return Object.fromEntries(entries)
}
