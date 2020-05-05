import React from 'react';
import { Link } from 'react-router-dom'
import cartIcon from '../images/cart.jpeg'
import searchIcon from '../images/search.jpeg'
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'

 class  Navbar extends React.Component{
     render(){
         debugger;
         //items = this.props.items;
    return(
            <nav className="nav-wrapper">
                <div className="container">
                    <div className="brand-logo">WELCOME TO SHOPPING PAGE</div>
                    
                    <div className="navigationbar">
                        
    <div className="navDiv"><Link to="/"><img className="cartImg" src={searchIcon}/></Link></div>
    <div className="navDiv"><Link to="/cart"><img className="cartImg" src={cartIcon}/><span className="cartCount">{this.props.addedItems.length}</span></Link></div>
                    </div>
                </div>
            </nav>
   
        
    )}
}

const mapStateToProps = (state)=>{
    return {
      items: state.items,
      addedItems: state.addedItems
    }
  }
const mapDispatchToProps= (dispatch)=>{
    return{
        addToCart: (id)=>{dispatch(addToCart(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)