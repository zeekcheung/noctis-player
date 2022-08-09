import axios from 'axios'

export const baseURL = process.env.REACT_APP_baseURL

// TODO: 完成登录功能
export const login = async (phone: string, password: string) => {
	const data = await axios.get(`${baseURL}/login/cellphone`, {
		params: { phone, password },
	})
	return data
}
