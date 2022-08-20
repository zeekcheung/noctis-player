import { useQuery } from '@tanstack/react-query'
import { PlainObject } from '../types'
import {
	Cat,
	cats,
	Playlist,
	playlistKeys,
	Song,
	songRespKeys,
} from '../types/playlist'
import { extractProps } from '../utils'
import { http } from './http'

// 获取歌单列表
export const fetchPlayLists = (cat: Cat, limit: number = 50) => {
	return new Promise<Playlist[]>((resolve, reject) => {
		http
			.get(`/top/playlist/highquality`, {
				params: { cat, limit },
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
	const promises: Promise<Playlist[]>[] = cats.map((cat) =>
		fetchPlayLists(cat, 4)
	)
	return Promise.all(promises)
}

export const useAllPlaylists = () => {
	return useQuery<Playlist[][], Error>(['allPlaylists'], fetchAllPlaylists)
}

// 获取歌单分类
export const fetchCatlist = () => {
	return new Promise<string[]>((resolve, reject) => {
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

// 获取歌单详情
export const fetchPlaylistById = (id: string) => {
	return new Promise<Playlist>((resolve, reject) => {
		http
			.get('/playlist/detail', {
				params: { id },
			})
			.then((res) => {
				const { playlist } = res.data
				resolve(extractProps(playlist, playlistKeys) as Playlist)
			})
			.catch((err) => {
				reject(err.res.data)
			})
	})
}

export const usePlaylist = (id: string) => {
	return useQuery<Playlist, Error>(['playlist'], () => fetchPlaylistById(id))
}

// 获取歌单所有歌曲
export const fetchAllSongsById = (playlistId: string) => {
	return new Promise<Song[]>((resolve, reject) => {
		http
			.get('/playlist/track/all', {
				params: { id: playlistId },
			})
			.then((res) => {
				const songsRes = res.data.songs as PlainObject[]

				const songs: Song[] = songsRes.map((song) => {
					const { id, name, ar, al, publishTime } = extractProps(
						song,
						songRespKeys
					)
					return {
						id,
						name,
						artist: { id: ar[0].id, name: ar[0].name },
						album: { id: al.id, name: al.name, picUrl: al.picUrl },
						publishTime,
					}
				})

				resolve(songs)
			})
			.catch((err) => {
				reject(err.res.data)
			})
	})
}

export const useAllSongs = (playlistId: string) => {
	return useQuery<Song[], Error>(['allSongs'], () =>
		fetchAllSongsById(playlistId)
	)
}
