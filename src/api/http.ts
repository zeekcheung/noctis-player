import axios from 'axios'

const baseURL = process.env.REACT_APP_baseURL

export const http = axios.create({
	baseURL,
	withCredentials: true,
})
