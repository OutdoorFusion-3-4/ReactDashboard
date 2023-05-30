import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Sidebar from '@components/sidebar/Sidebar';

function Navbar() {
	return (
		<>
			<AppBar component={'nav'}>
				<Toolbar>
					<Typography variant="h6">
                        Dashboard
					</Typography>
				</Toolbar>
			</AppBar>
			<Sidebar />
		</>
		
	);
}

export default Navbar;