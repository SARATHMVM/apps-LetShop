import React from 'react';
import { Link } from 'react-router-dom'
import cartIcon from '../images/cart.jpeg'
import searchIcon from '../images/search.jpeg'
 const Navbar = ()=>{
    return(
            <nav className="nav-wrapper">
                <div className="container">
                    <div className="brand-logo">WELCOME TO SHOPPING PAGE</div>
                    
                    <div className="navigationbar">
                        
                        <div className="navDiv"><Link to="/"><img className="cartImg" src={searchIcon}/></Link></div>
                        <div className="navDiv"><Link to="/cart"><img className="cartImg" src={cartIcon}/></Link></div>
                    </div>
                </div>
            </nav>
   
        
    )
}

export default Navbar;