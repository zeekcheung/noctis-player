import { PlainObject } from '../types'
import {
	Cat,
	cats,
	Playlist,
	playlistKeys,
	Track,
	trackRespKeys,
} from '../types/playlist'
import { extractProps } from '../utils/format'
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
			.catch(reject)
	})
}

// 获取首页推荐歌单列表
export const fetchAllPlaylists = (): Promise<Playlist[][]> => {
	const promises: Promise<Playlist[]>[] = cats.map((cat) =>
		fetchPlayLists(cat, 4)
	)
	return Promise.all(promises)
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
			.catch(reject)
	})
}

// 获取歌单详情
export const fetchPlaylistById = (id: Playlist['id']) => {
	return new Promise<Playlist>((resolve, reject) => {
		http
			.get('/playlist/detail', {
				params: { id },
			})
			.then((res) => {
				const { playlist } = res.data
				resolve(extractProps(playlist, playlistKeys) as Playlist)
			})
			.catch(reject)
	})
}

// 获取歌单所有歌曲
export const fetchAllTracksById = (playlistId: Playlist['id']) => {
	return new Promise<Track[]>((resolve, reject) => {
		http
			.get('/playlist/track/all', {
				params: { id: playlistId },
			})
			.then((res) => {
				const tracksRes = res.data.songs as PlainObject[]

				const tracks: Track[] = tracksRes.map((track) => {
					const { id, name, ar, al, publishTime, dt } = extractProps(
						track,
						trackRespKeys
					)
					return {
						id,
						name,
						artist: { id: ar[0].id, name: ar[0].name },
						album: { id: al.id, name: al.name, picUrl: al.picUrl },
						publishTime,
						duration: dt,
					}
				})

				resolve(tracks)
			})
			.catch(reject)
	})
}

// 获取歌曲 url
export const fetchTrackUrl = (trackId: Track['id']) => {
	return new Promise<string>((resolve, reject) => {
		http
			.get('/song/url', {
				params: {
					id: trackId,
				},
			})
			.then((res) => {
				resolve(res.data.url)
			})
			.catch(reject)
	})
}
