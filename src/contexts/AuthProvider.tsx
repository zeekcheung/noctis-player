import { createContext, ReactNode, useContext } from 'react'

interface User {
	username: string
}

interface IContext {
	user: User | null
	// login: () => Promise<User | null>
	// logout: () => Promise<void>
}

export const AuthContext = createContext<IContext | null>(null)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	// TODO：初始化用户
	return (
		<AuthContext.Provider
			value={{
				user: null,
			}}
		>
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
