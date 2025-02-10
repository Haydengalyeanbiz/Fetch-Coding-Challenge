import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { SiWolframlanguage } from 'react-icons/si';
import { IoLogOutOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/authReducer';

const NavBar = () => {
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};
	return (
		<nav className='nav-bar'>
			<h3 className='navbar-title'>
				<SiWolframlanguage /> Furever Friends
			</h3>
			<ul className='navbar-items'>
				<li>
					<NavLink
						to='/search'
						className={({ isActive }) => (isActive ? 'active' : '')}
					>
						Search
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/favorites'
						className={({ isActive }) => (isActive ? 'active' : '')}
					>
						Favorites
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/match'
						className={({ isActive }) => (isActive ? 'active' : '')}
					>
						Match Me
					</NavLink>
				</li>
			</ul>
			<button onClick={() => handleLogout()}>
				<IoLogOutOutline />
			</button>
		</nav>
	);
};

export default NavBar;
