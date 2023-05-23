import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Protected from '@components/Protected';
import LoadingScreen from '@components/LoadingScreen/LoadingScreen';
const Index = React.lazy(() => import('@pages/index/Index'));
const Countries = React.lazy(() => import('@pages/countries/countries'));
const Login = React.lazy(() => import('@pages/login/login'));
const Uploads = React.lazy(() => import('@pages/uploads/uploads'));
const Orders = React.lazy(() => import('@pages/orders/orders'));

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Protected>
				<Suspense fallback={<LoadingScreen />}>
					<Index />
				</Suspense>
			</Protected>
		),
	},
	{
		path: '/countries',
		element: (
			<Protected>
				<Suspense fallback={<LoadingScreen />}>
					<Countries />
				</Suspense>
			</Protected>
		),
	},
	{
		path: '/login',
		element: (
			<Suspense fallback={<LoadingScreen />}>
				{' '}
				<Login />
			</Suspense>
		),
	},
	{
		path: '/uploads',
		element: (
			<Protected>
				<Suspense fallback={<LoadingScreen />}>
					<Uploads />
				</Suspense>
			</Protected>
		),
	},
	{
		path: '/orders',
		element: (
			<Protected>
				<Suspense fallback={<LoadingScreen />}>
					<Orders />
				</Suspense>
			</Protected>
		),
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
