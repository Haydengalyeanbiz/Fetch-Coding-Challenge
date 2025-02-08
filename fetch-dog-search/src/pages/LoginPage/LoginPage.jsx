import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/reducers/authReducer';
import { useNavigate } from 'react-router-dom';
import { LuBone } from 'react-icons/lu';
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
			<h1>
				<LuBone /> Furever Friends <LuBone />
			</h1>
			<h3>Log in to find you furever friend</h3>
			<form
				onSubmit={handleSubmit}
				className='login-form'
			>
				<div className='login-form-input'>
					<label htmlFor='name'>Name:</label>
					<input
						id='name'
						type='text'
						placeholder='Enter your name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>

				<div className='login-form-input'>
					<label htmlFor='email'>Email:</label>
					<input
						id='email'
						type='email'
						placeholder='Enter your email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>

				<button type='submit'>Login</button>
			</form>
		</div>
	);
};

export default Login;
