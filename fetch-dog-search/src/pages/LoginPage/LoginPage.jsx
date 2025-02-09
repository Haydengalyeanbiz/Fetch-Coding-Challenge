import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/reducers/authReducer';
import { useNavigate } from 'react-router-dom';
import { SiWolframlanguage } from 'react-icons/si';
import './LoginPage.css';

const Login = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.session.isAuthenticated);

	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		await dispatch(login(name, email));
		if (isAuthenticated) {
			navigate('/search');
		}
	};

	return (
		<div className='login-container'>
			<div className='login-background'>
				<SiWolframlanguage size={650} />
			</div>
			<div className='login-wrapper'>
				<h1 className='login-main-title'>Furever Friends</h1>
				<h3>Log in to find you furever friend</h3>
				<form
					onSubmit={handleSubmit}
					className='login-form'
				>
					<div className='login-form-input-div'>
						<label
							className='login-label'
							htmlFor='name'
						>
							Name:
						</label>
						<input
							className='login-input'
							id='name'
							type='text'
							placeholder='Enter your name'
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>

					<div className='login-form-input-div'>
						<label
							className='login-label'
							htmlFor='email'
						>
							Email:
						</label>
						<input
							className='login-input'
							id='email'
							type='email'
							placeholder='Enter your email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					<button
						className='login-button'
						type='submit'
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
