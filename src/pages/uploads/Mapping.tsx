import { Card, CardContent, Box, Typography, IconButton, Button, CircularProgress } from '@mui/material';
import React from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import CloseIcon from '@mui/icons-material/Close';

type MappingProps = {
	file: File;
	id: string;
	removeFile: (name: string) => void;
	setMapping: (id: string, code: string) => void;
}
function Mapping(props: MappingProps) {

	const [code, setCode] = React.useState(
		`{
		"tables": [

			{
				"table_name": "table1",
				"column_names": [
					"column1",
					"column2",
					"column3"
				]
			}
		}`
	);
	return (
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
						<Typography variant='caption'>{props.file.name}</Typography>
					</Box>
					<Box>
						<IconButton onClick={()=>props.removeFile(props.file.name)}>
							<CloseIcon/>
						</IconButton>
					</Box>
				</Box>
				<Box>
					<CodeEditor
						value={code}
						language="json"
						placeholder=""
						onChange={(e) => {
							setCode(e.target.value);
							props.setMapping(props.id, e.target.value);
						}}
						padding={25}
						style={{
							fontSize: 12,
							backgroundColor: '#fff',
							fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
							border: '1px solid #f0f0f0',

						}}
					/>
				</Box>
			</CardContent>
		</Card>
	);
}

export default Mapping;