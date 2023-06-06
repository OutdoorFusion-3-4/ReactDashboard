import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import * as EmailValidator from 'email-validator';
import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '@components/Protected';

export default function Login() {

	const [open, setErrorOpen] = React.useState(false);
	const navigate = useNavigate();
	if (getCookie('Authenticated')) {
		navigate('/');
	}
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data = {
			email: formData.get('email'),
			password: formData.get('password'),
		};
		if (!data.email) {
			setErrorOpen(true);
			return;
		}

		if (!EmailValidator.validate(data.email.toString())) {
			setErrorOpen(true);
		}
		try {
			await axios({
				method: 'post',
				url: '/api/login',
				data: formData,
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			navigate('/');
		} catch (error) {
			console.error(`Error occurred: ${error}`);

		}

	};

	return (
		<Container component="main" maxWidth="sm">
			<Box
				sx={{
					boxShadow: 3,
					borderRadius: 2,
					px: 4,
					py: 6,
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Collapse in={open}>
						<Alert
							severity="error"
							action={
								<IconButton
									aria-label="close"
									color="inherit"
									size="small"
									onClick={() => {setErrorOpen(false);}}
								>
									<CloseIcon fontSize="inherit" />
								</IconButton>
							}
							sx={{ mb: 2 }}
						>
							Please enter a valid email address
						</Alert>
					</Collapse>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign In
					</Button>
				</Box>
			</Box>
		</Container>
	);
}