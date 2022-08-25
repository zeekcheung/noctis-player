import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FullSizeLoading } from 'components/lib'

import HomeTab from '../pages/Home/Home'
import SearchTab from '../pages/Home/Search'
import LibraryTab from '../pages/Home/Library'
import PlaylistDetailTab from '../pages/Home/PlaylistDetail'

/* 路由懒加载 */
const Home = lazy(() => import('../pages/Home'))
const Login = lazy(() => import('../pages/Login'))
// const HomeTab = lazy(() => import('../pages/Home/Home'))
// const SearchTab = lazy(() => import('../pages/Home/Search'))
// const LibraryTab = lazy(() => import('../pages/Home/Library'))
// const PlaylistDetailTab = lazy(() => import('../pages/Home/PlaylistDetail'))

export const Router = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<FullSizeLoading minHeight={'100vh'} />}>
				<Routes>
					<Route path="/" element={<Home />}>
						<Route index element={<HomeTab />} />
						<Route path="home" element={<HomeTab />} />
						<Route path="search" element={<SearchTab />} />
						<Route path="library" element={<LibraryTab />} />
						<Route path="playlistDetail/:id" element={<PlaylistDetailTab />} />
					</Route>
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<Home />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}
