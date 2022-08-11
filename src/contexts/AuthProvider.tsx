import { createContext, useContext, useEffect, useState } from 'react'
import { fetchUserInfo, login as _login, logout as _logout } from '../api/user'
import { ProviderProps } from '../types'
import { User } from '../types/user'

interface IContext {
	user: User | null
	login: (...props: Parameters<typeof _login>) => Promise<void>
	logout: () => Promise<void>
}

export const AuthContext = createContext<IContext | null>(null)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: ProviderProps) => {
	const [user, setUser] = useState<User | null>(null)
	const login = (...data: Parameters<typeof _login>) =>
		_login(...data).then(setUser)
	const logout = () => _logout().then(setUser)

	// TODO：组件挂载时初始化用户状态
	useEffect(() => {
		fetchUserInfo()
			.then(setUser)
			.catch((err) => console.error(err))
	}, [])

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useUser = () => {
	const value = useContext(AuthContext)
	if (!value) {
		return null
	}
	return value.user
}

export const useAuth = () => {
	const value = useContext(AuthContext)
	// 抛出异常可以用于返回值的类型收窄
	if (!value) {
		throw new Error('当前组件树匹配不到 AuthProvider')
	}
	return { ...value }
}
