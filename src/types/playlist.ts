export interface Playlist {
	id: string
	name: string
	userId: string
	createTime: string
	coverImgUrl: string
	description: string
	tag: string
	playCount: number
}

export const playlistKeys = [
	'id',
	'name',
	'userId',
	'createTime',
	'coverImgUrl',
	'description',
	'tag',
	'playCount',
]
