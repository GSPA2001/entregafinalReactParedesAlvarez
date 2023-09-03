import './NavBar.css';
import CartWidget from "../CartWidget/CartWidget"
import { NavLink, Link } from 'react-router-dom';

const NavBar = () =>{
return(
    <nav className="NavBar">
        <Link to='/' className="navbar-title">
         <h1>El Sabor Norteño</h1>
        </Link>
        
        <div className='Categories'>
            <NavLink to={`/category/entradas`} className={({ isActive}) => isActive ? 'ActiveOption' : 'Option'}>Entradas</NavLink>
            <NavLink to={`/category/extras`} className={({ isActive}) => isActive ? 'ActiveOption' : 'Option'}>Extras</NavLink>
            <NavLink to={`/category/principales`} className={({ isActive}) => isActive ? 'ActiveOption' : 'Option'}>Principales</NavLink>
        </div>
        <CartWidget/>
    </nav>
)}

export default NavBar;