import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	Collapse,
	IconButton,
	Typography,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import CodeEditor from '@uiw/react-textarea-code-editor';

function Uploads() {
	const [files, setFiles] = React.useState<File[]>([]);
	const [isDragOver, setIsDragOver] = React.useState(false);
	const inputFile = React.useRef<HTMLInputElement | null>(null);
	const [code, setCode] = React.useState(
		'function add(a, b) {\n  return a + b;\n}'
	);
    
	const onButtonClick = () => {
		const uploadBtn = inputFile.current as HTMLInputElement;
		if (uploadBtn) {
			uploadBtn.click();
		}
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
	const removeFile = (name: string) => {
		const newFiles = files.filter((file) => file.name !== name);
		setFiles(newFiles);
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
							<Card sx={{
								mt: '1rem',
							}}
							>
								<CardContent>
									<Box sx={{
										display: 'flex',
										justifyContent: 'space-between',
									}}>
										<Box>
											<Typography variant='subtitle2'>Storage Mapping</Typography>
											<Typography variant='body1'>{file.name}</Typography>
										</Box>
										<Box>
											<IconButton onClick={()=>removeFile(file.name)}>
												<CloseIcon/>
											</IconButton>
										</Box>
									</Box>
									<Box>
										<CodeEditor
											value={code}
											language="json"
											placeholder=""
											onChange={(evn) => setCode(evn.target.value)}
											padding={25}
											style={{
												fontSize: 12,
												backgroundColor: '#181b20',
												fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
											}}
										/>

									</Box>
								</CardContent>
							</Card>
						</Collapse>
					);
				})}
			</TransitionGroup>
		</Box>
	);
}

export default Uploads;
