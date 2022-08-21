import { useQuery } from '@tanstack/react-query'
import { Playlist, Song } from '../types/playlist'
import {
	fetchAllPlaylists,
	fetchAllSongsById,
	fetchCatlist,
	fetchPlaylistById,
} from '../api/playlist'

// 获取全部歌单
export const useAllPlaylists = () => {
	return useQuery<Playlist[][], Error>(['allPlaylists'], fetchAllPlaylists)
}

// 获取歌单分类
export const useCatlist = () => {
	return useQuery<string[], Error>(['catlist'], fetchCatlist)
}

// 获取歌单详情
export const usePlaylist = (id: string) => {
	return useQuery<Playlist, Error>(['playlist'], () => fetchPlaylistById(id))
}

// 获取歌单全部歌曲
export const useAllSongs = (playlistId: string) => {
	return useQuery<Song[], Error>(['allSongs'], () =>
		fetchAllSongsById(playlistId)
	)
}
