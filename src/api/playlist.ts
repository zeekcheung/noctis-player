import { useQuery } from '@tanstack/react-query'
import { Playlist, playlistKeys } from '../types/playlist'
import { extractProps } from '../utils'
import { http } from './http'

// 歌单标签
export type Cat = '华语' | '粤语' | '欧美'
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
	return useQuery(['allPlaylists'], fetchAllPlaylists)
}
