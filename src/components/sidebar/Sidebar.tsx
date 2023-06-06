import React from 'react';
import { Divider, Drawer, IconButton, List, ListItem, Toolbar, Tooltip } from '@mui/material';
import { SideIcons } from './SideIcons';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';

const navigate = useNavigate();

async function HandleLogout() {
	try{
		await axios.post('api/logout');
		navigate('/login');
	}
	catch(error) {
		console.error('Error occured: ' + error);
	}
}

function Sidebar() {
	
	return (
		<Drawer
			components={{
				Root: 'nav',
				Backdrop: 'div'
			}}
			variant='permanent'
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'flex-end',
				position: 'relative',
				width: '80px',
			}}
			PaperProps={{
				sx: {
					zIndex: 1,
				}
			}}
		>
			<Toolbar />
			<Divider/>
			<List sx={{
				width: '80px',
			}}>
				{SideIcons.map((icon, index) => (
					<ListItem key={index}>
						<Tooltip
							title={icon.name}
							placement='right'
						>
							<IconButton onClick={()=>navigate(icon.path)}>
								{icon.icon}
							</IconButton>
						</Tooltip>
					</ListItem>
				))}
			</List>
			<List sx={{mt: 'auto'}}>
				<ListItem>
					<Tooltip 
						title="Logout"
						placement="right"
					>
						<IconButton onClick={()=>{
							HandleLogout();
							
						}}>
							<LogoutIcon fontSize="large"/>
						</IconButton>
					</Tooltip>
				</ListItem>
			
			</List>
		</Drawer>
	);
}

export default Sidebar;