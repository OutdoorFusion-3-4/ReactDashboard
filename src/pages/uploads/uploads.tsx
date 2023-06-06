import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardContent,
	CircularProgress,
	Collapse,
	IconButton,
	Typography,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import CodeEditor from '@uiw/react-textarea-code-editor';
import axios from 'axios';
import Mapping from './Mapping';

function Uploads() {
	const [files, setFiles] = React.useState<File[]>([]);
	const [isDragOver, setIsDragOver] = React.useState(false);
	const inputFile = React.useRef<unknown>(null);
	const [loading, setLoading] = React.useState(false);
	const [mappings, setMappings] = React.useState<string[]>([]);
    
	const onButtonClick = () => {
		const uploadBtn = inputFile.current as HTMLInputElement;
		if (uploadBtn) {
			uploadBtn.click();
		}
	};
	const removeFile = (name: string) => {
		const newFiles = files.filter((file) => file.name !== name);
		setFiles(newFiles);
	};
	const handleFileUpload = (e: React.FormEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLInputElement;
		if (!target.files) {
			return;
		}
		const files = Array.from(target.files);
		setFiles(files);
		console.log(files);
	};

	const Submit = async () => {
		setLoading(true);
		const formData = new FormData();
		files.forEach((file) => {
			formData.append(file.name, file);
			formData.append(`mapping_${file.name}`, JSON.stringify(code));

		});
		formData.append('file', files[0]);
		console.log(formData);
		try {
			await axios({
				url: '/api/upload',
				method: 'POST',
				data: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		}
		catch (err) {
			console.log(err);
		}
		finally{
			setLoading(false);
		}
	};
	return (
		<Box>

			<Typography variant="h4">Upload Files</Typography>
			<Card
				onDragOver={() => {
					setIsDragOver(true);
				}}
				onDragLeave={() => {
					setIsDragOver(false);
				}}
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					mt: '1rem',
					border: isDragOver ? '2px solid ' : 'none',
					borderColor: isDragOver ? 'primary.light' : 'transparent',
				}}
				elevation={isDragOver ? 10 : 1}
			>
				<CardActionArea
					sx={{
						height: 'inherit',
					}}
					onClick={onButtonClick}
					onChange={handleFileUpload}
				>
					<input
						hidden
						multiple
						type="file"
						ref={inputFile}
						accept=".csv, .accdb"
					/>
					<CardContent
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Typography
							variant="h5"
							sx={{
								mb: '1rem',
							}}
						>
              Click to Upload a CSV or Microsoft Access file to the database or
              drag and drop it here.
						</Typography>
						<UploadFileIcon
							sx={{
								fontSize: '100px',
								color: 'primary.main',
							}}
						/>

					</CardContent>
				</CardActionArea>
			</Card>
			<TransitionGroup>
				{files.map((file) => {
					return (
						<Collapse
							key={file.name}
						>
							<Mapping
								removeFile={removeFile}
							/>
						</Collapse>
					);
				})}
			</TransitionGroup>
		</Box>
	);
}

export default Uploads;
