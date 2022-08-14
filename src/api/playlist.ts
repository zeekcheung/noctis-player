import { useQuery } from '@tanstack/react-query'
import { Playlist, playlistKeys } from '../types/playlist'
import { extractProps } from '../utils'
import { http } from './http'

// 歌单标签
export type Cat = '华语' | '粤语' | '欧美' | string
export const cats: Cat[] = ['粤语', '华语', '欧美']

// 获取歌单列表
export const fetchPlayLists = (cat: Cat): Promise<Playlist[]> => {
	return new Promise((resolve, reject) => {
		http
			.get(`/top/playlist/highquality`, {
				params: { cat, limit: 4 },
			})
			.then((res) => {
				const { playlists } = res.data
				resolve(
					playlists.map((playlist: Playlist) =>
						extractProps(playlist, playlistKeys)
					)
				)
			})
			.catch((err) => {
				reject(err.response.data)
			})
	})
}

// 获取首页推荐歌单列表
export const fetchAllPlaylists = (): Promise<Playlist[][]> => {
	const promises: Promise<Playlist[]>[] = cats.map((cat) => fetchPlayLists(cat))
	return Promise.all(promises)
}

export const useAllPlaylists = () => {
	return useQuery<Playlist[][], Error>(['allPlaylists'], fetchAllPlaylists)
}

// 获取歌单分类
export const fetchCatlist = (): Promise<string[]> => {
	return new Promise((resolve, reject) => {
		http
			.get('/playlist/catlist')
			.then((res) => {
				const { sub } = res.data
				resolve(sub.map((catData: { name: string }) => catData.name))
			})
			.catch((err) => reject(err.res.data))
	})
}

export const useCatlist = () => {
	return useQuery<string[], Error>(['catlist'], fetchCatlist)
}
