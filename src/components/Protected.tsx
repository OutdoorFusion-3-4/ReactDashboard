import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import { Box, Container, Toolbar } from '@mui/material';
export function getCookie(cookieName: string) {
	const cookies = document.cookie.split(';');
  
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
  
		// Check if the cookie starts with the provided name
		if (cookie.startsWith(cookieName + '=')) {
			// Extract and return the cookie value
			return true;
		}
	}
  
	// Return null if the cookie is not found
	return null;
}
  
function Protected(props: { children: JSX.Element }) {
	if (!getCookie('Authenticated')) {
		return <Navigate
			to={'/login'}
			replace
		/>;
	}
	return <Box
		sx={{
			display: 'flex',
		}}>
		<Navbar />
		<Box
			component={'main'}
			sx={{
				flexGrow: 1,
				height: '100vh',
				overflow: 'auto',
			}}
		>
			<Toolbar/>
			<Container maxWidth='lg' sx={{
				mt: 4,
				mb: 4,
			}}
			>
				
				{props.children}
			</Container>
		</Box>
	</Box>;
}

export default Protected;