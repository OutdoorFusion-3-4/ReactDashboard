import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardContent,
	CircularProgress,
	Collapse,
	Typography,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import axios from 'axios';
import Mapping from './Mapping';

function Uploads() {
	const [files, setFiles] = React.useState<File[]>([]);
	const [isDragOver, setIsDragOver] = React.useState(false);
	const inputFile = React.useRef<HTMLInputElement | null>(null);
	const [loading, setLoading] = React.useState(false);
	const [mappings, setMappings] = React.useState<string[]>([]);

	const updateMapping = (id: string, code: string) => {
		setMappings(prev => {
			const newMappings = [...prev];
			newMappings[files.findIndex(file => file.name === id)] = code;
			console.log(newMappings);
			return newMappings;
		});
	};
    
	const onButtonClick = () => {
		const uploadBtn = inputFile.current as HTMLInputElement;
		if (uploadBtn) {
			uploadBtn.click();
		}
	};
	const removeFile = (name: string) => {
		const newFiles = files.filter((file) => file.name !== name);
		setFiles(newFiles);
		setMappings(prev => prev.filter((_, i) => i !== files.findIndex(file => file.name === name)));
	};

	const handleFileUpload = (e: React.FormEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLInputElement;
		if (!target.files) {
			return;
		}
		const files = Array.from(target.files);
		setFiles(files);
		setMappings(prev => [...prev, '']);
	};

	const Submit = async () => {
		setLoading(true);
		const formData = new FormData();
		files.forEach((file) => {
			formData.append(file.name, file);
			formData.append('mappings', JSON.stringify(mappings));

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
								id={file.name}
								removeFile={removeFile}
								setMapping={updateMapping}
								file={file}
							/>
						</Collapse>
					);
				})}
			</TransitionGroup>
			<Box
				sx={{
					mt: 2,
				}}
			>
				<Button
					disabled={files.length === 0 || loading || mappings.length === 0}
					variant="contained"
					color="primary"
					onClick={Submit}
				>
					{loading? <CircularProgress/> : 'Submit'}
				</Button>
			</Box>

		</Box>
	);
}

export default Uploads;
