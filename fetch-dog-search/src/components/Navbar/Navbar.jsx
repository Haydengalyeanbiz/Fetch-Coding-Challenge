import { NavLink } from 'react-router-dom';
import './Navbar.css'; // optional
import { SiWolframlanguage } from 'react-icons/si';

const NavBar = () => {
	return (
		<nav className='nav-bar'>
			<h3 className='navbar-title'>
				<SiWolframlanguage />
				Furever Friends
			</h3>
			<ul>
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
		</nav>
	);
};

export default NavBar;
