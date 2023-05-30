import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import PublicIcon from '@mui/icons-material/Public';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
type SideIcon = {
    icon: JSX.Element;
    path: string;
    name: string;
}
const iconSize = 'large';
export const SideIcons: SideIcon[] = [
	{
		icon: <DashboardIcon fontSize={iconSize} />,
		path: '/',
		name: 'Dashboard'
	},
	{
		icon: <PublicIcon fontSize={iconSize} />,
		path: '/countries',
		name: 'Countries'
	},
	{
		icon: <InventoryIcon fontSize={iconSize}/>, 
		path: '/orders',
		name: 'Orders'
	},
	{
		icon: <CloudUploadIcon fontSize={iconSize}/>,
		path: '/uploads',
		name: 'Upload Data to Database'
	}
];