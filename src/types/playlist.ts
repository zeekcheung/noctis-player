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
