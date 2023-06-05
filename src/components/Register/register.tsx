import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React from 'react';

export default function Register() {

	async function registerUser(data: unknown) {

		try {
			const response = await axios.post('https://c80e5846-3798-4f42-8af7-230d2eb0a943.mock.pstmn.io/mock ', data);
			console.log(response.data);
		} catch (error) {
			console.error(`Error occurred: ${error}`);

		}
	}

	const handleSubmit = (event: any) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get('email'),
			password: data.get('password'),
		});
		registerUser(data);
	};

	return (

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
			<Typography component="h1" variant="h4"  sx={{
				fontWeight: 'bold',
				marginBottom: 3.5,
			}}>
                Register new User
			</Typography>
			<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
				<Typography variant="body1" sx={{ fontWeight: 'bold' }} align="left">
                    E-mail Address
				</Typography>
				<TextField
					margin="normal"
					required
					fullWidth
					id="email"
					label="E-mail address of user"
					name="email"
					autoComplete="email"
					autoFocus
				/>
				<Typography variant="body1" sx={{ fontWeight: 'bold' }} align="left">
                    Username
				</Typography>
				<TextField
					margin="normal"
					required
					fullWidth
					id="username"
					label="Username of user"
					name="username"
					autoFocus
				/>
				<Typography variant="body1" sx={{ fontWeight: 'bold' }} align="left">
                    Password
				</Typography>
				<TextField
					margin="normal"
					required
					fullWidth
					name="password"
					label="Password of user"
					type="password"
					id="password"
				/>
				<Typography variant="body1" sx={{ fontWeight: 'bold' }} align="left">
                    Repeat password
				</Typography>
				<TextField
					margin="normal"
					required
					fullWidth
					name="repeat-password"
					label="Repeat password "
					type="repeat-password"
					id="repeat-password"
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
				>
                    Create account
				</Button>
			</Box>
		</Box>
	);
}