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
import React from 'react';

export default function Login() {
	const [open, setOpen] = React.useState(false);

	async function verifyLogin(data: object) {

		try {
			const response = await axios.post('/api/login ', data);
		} catch (error) {
			console.error(`Error occurred: ${error}`);

		}
	}

	const handleSubmit = (event: any) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const email = data.get('email');
		if (email) {
			if (EmailValidator.validate(email.toString()))
				verifyLogin(data);
			else {
				setOpen(true);
				console.error('Email is not valid');
			}
		}
		else {
			console.error('Email is not defined');
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
									onClick={() => {
										setOpen(false);
									}}
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