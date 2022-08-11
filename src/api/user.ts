import { User } from '../types/user'
import { http } from './http'

const storage = window.localStorage

// 在 localStorage 中设置用户信息
export const setUserInfo = (user: User) => {
	for (const [key, value] of Object.entries(user)) {
		storage.setItem(`__${key}__`, value)
	}
}

// 在 localStorage 中清除用户信息
export const clearUserInfo = () => {
	storage.clear()
}

// 在 localStorage 中读取用户信息
export const getUserInfo = (keys: string[]) => {
	return keys.map((key) => storage.getItem(`__${key}__`) || '')
}

// 登录
export const login = (phone: string, password: string): Promise<User> => {
	return new Promise((resolve, reject) => {
		http
			.get('/login/cellphone', {
				params: { phone, password },
			})
			.then((res) => {
				const { userId, userName, vipType } = res.data.account
				const { nickname, avatarUrl } = res.data.profile
				const user: User = { userId, userName, nickname, vipType, avatarUrl }

				resolve(user)
				setUserInfo(user)
			})
			.catch((err) => {
				reject(err.response.data)
			})
	})
}

// 登出
export const logout = (): Promise<null> => {
	return new Promise((resolve, reject) => {
		http
			.get('/logout')
			.then(() => {
				resolve(null)
				clearUserInfo()
			})
			.catch((err) => {
				reject(err.response.data)
			})
	})
}

// TODO: 获取用户详情
export const fetchUserInfo = (): Promise<User | null> => {
	return new Promise((resolve, reject) => {
		const [uid] = getUserInfo(['userId'])
		if (!uid) {
			resolve(null)
			return
		}
		http
			.get(`/user/uid=${uid}`)
			.then((res) => {
				const { nickname, avatarUrl, vipType, userId } = res.data.profile
				const userName = ''
				const user: User = { userId, userName, nickname, vipType, avatarUrl }

				resolve(user)
				setUserInfo(user)
			})
			.catch((err) => {
				reject(err.response.data)
			})
	})
}
