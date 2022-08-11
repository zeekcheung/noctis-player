import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FullSizeLoading } from '../components/lib'

/* 路由懒加载 */
const Home = lazy(() => import('../pages/Home'))
const Login = lazy(() => import('../pages/Login'))
const HomeTab = lazy(() => import('../pages/Home/Home'))
const SearchTab = lazy(() => import('../pages/Home/Search'))
const LibraryTab = lazy(() => import('../pages/Home/Library'))

export const Router = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<FullSizeLoading />}>
				<Routes>
					<Route path="/" element={<Home />}>
						<Route index element={<HomeTab />} />
						<Route path="home" element={<HomeTab />} />
						<Route path="search" element={<SearchTab />} />
						<Route path="library" element={<LibraryTab />} />
					</Route>
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<Home />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}
