import { createContext, ReactNode, useContext, useState } from 'react'
import { login as _login, logout as _logout } from '../api/user'

export interface User {
	id: number
	vipType: number
	userName: string
	nickname: string
	avatarUrl: string
}

interface IContext {
	user: User | null
	login: (...props: Parameters<typeof _login>) => Promise<void>
	logout: () => Promise<void>
}

export const AuthContext = createContext<IContext | null>(null)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)
	const login = (...data: Parameters<typeof _login>) =>
		_login(...data).then(setUser)
	const logout = () => _logout().then(setUser)

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
