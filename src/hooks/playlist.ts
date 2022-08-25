import { useQuery } from '@tanstack/react-query'
import {
	fetchAllPlaylists,
	fetchAllTracksById,
	fetchCatlist,
	fetchPlaylistById,
} from '../api/playlist'
import { Playlist, Track } from '../types/playlist'

// 获取全部歌单
export const useAllPlaylists = () => {
	return useQuery<Playlist[][], Error>(['allPlaylists'], fetchAllPlaylists)
}

// 获取歌单分类
export const useCatlist = () => {
	return useQuery<string[], Error>(['catlist'], fetchCatlist)
}

type PlaylistId = Playlist['id']

// 获取歌单详情
export const usePlaylist = (playlistId: PlaylistId) => {
	return useQuery<Playlist, Error>(['playlist', playlistId], () =>
		fetchPlaylistById(playlistId)
	)
}

// 获取歌单全部歌曲
export const useAllTracks = (playlistId: PlaylistId) => {
	return useQuery<Track[], Error>(['allTracks', playlistId], () =>
		fetchAllTracksById(playlistId)
	)
}
