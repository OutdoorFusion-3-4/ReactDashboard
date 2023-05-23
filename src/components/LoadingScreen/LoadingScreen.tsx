import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

function LoadingScreen() {
	return (
		<Box sx={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		}}>
			<Box>
				<CircularProgress color='primary'/>
				<Typography>
                    Loading...
				</Typography>
			</Box>
		</Box>
	);
}

export default LoadingScreen;