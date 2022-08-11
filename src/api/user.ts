import { User } from '../types/user'
import { http } from './http'

export const tokenKey = '__token__'

// 设置 token
export const setToken = (token: string) =>
	window.localStorage.setItem(tokenKey, token)

// 清除 token
export const clearToken = () => window.localStorage.removeItem(tokenKey)

// FIXME: 解决无法登录问题
export const login = (phone: string, password: string): Promise<User> => {
	return new Promise((resolve, reject) => {
		http
			.get('/login/cellphone', {
				params: { phone, password },
			})
			.then((res) => {
				const { id, userName, vipType } = res.data.account
				const { nickname, avatarUrl } = res.data.profile
				const token = res.data.token

				resolve({ id, userName, vipType, nickname, avatarUrl })
				setToken(token)
			})
			.catch((err) => {
				reject(err.response.data)
			})
	})
}

export const logout = (): Promise<null> => {
	return new Promise((resolve, reject) => {
		http
			.get('/logout')
			.then(() => {
				resolve(null)
				clearToken()
			})
			.catch((err) => {
				reject(err.response.data)
			})
	})
}
