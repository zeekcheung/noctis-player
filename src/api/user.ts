import axios from 'axios'
import { User } from '../contexts/AuthProvider'

export const baseURL = process.env.REACT_APP_baseURL

export const tokenKey = '__token__'

// 设置 token
export const setToken = (token: string) =>
	window.localStorage.setItem(tokenKey, token)

// 清除 token
export const clearToken = () => window.localStorage.removeItem(tokenKey)

export const login = (phone: string, password: string): Promise<User> => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${baseURL}/login/cellphone`, {
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
		axios
			.get(`${baseURL}/logout`)
			.then(() => {
				resolve(null)
				clearToken()
			})
			.catch((err) => {
				reject(err.response.data)
			})
	})
}
