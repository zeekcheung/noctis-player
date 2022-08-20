import { ReactNode } from 'react'

// 歌单标签
export type Cat = '华语' | '粤语' | '欧美' | string
export const cats: Cat[] = ['粤语', '华语', '欧美']

export interface Playlist {
	id: string
	name: string
	description: string
	coverImgUrl: string
	subscribedCount: number
	trackCount: number
	createTime: string
	userId: string
	tag: string
	playCount: number
}

export type playlistKey = keyof Playlist

export const playlistKeys: playlistKey[] = [
	'id',
	'name',
	'description',
	'coverImgUrl',
	'subscribedCount',
	'trackCount',
	'createTime',
	'userId',
	'tag',
	'playCount',
]

export interface Song {
	id: string
	name: string // 歌名
	artist: Artist // 歌手
	album: Album // 专辑，"al"字段
	publishTime: string // 发布时间
	length?: string // 时长
}

export const songRespKeys: string[] = ['id', 'name', 'ar', 'al', 'publishTime']

export interface Artist {
	id: string
	name: string
}

export interface Album {
	id: string
	name: string
	picUrl: string
}

// 歌单列表列
export interface Column {
	id: '#' | 'TITLE' | 'ALBUM' | 'DATE PUBLISHED' | '🕒'
	label: string | ReactNode
	minWidth?: number | string
	maxWidth?: number | string
	align?: 'left' | 'right' | 'center'
	format: (song: Song, index?: number) => ReactNode
}
