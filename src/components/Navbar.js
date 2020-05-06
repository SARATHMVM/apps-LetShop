import React from 'react';
import { Link } from 'react-router-dom'
import cartIcon from '../images/cart.jpeg'
import searchIcon from '../images/search.jpeg'
import homeIcon from '../images/home.jpeg'
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'


 class  Navbar extends React.Component{

    handleSearch = () => {
        let searchValue = prompt("Enter your search item : ", "item1");
        let searchFilter = [];
        console.log(searchValue);
        this.props.items.map(item=>{
            if(item['title'] == searchValue){
                searchFilter.push(item);
            }
        })
        console.log("Am from filter")
        console.log(searchFilter);
        this.props.handleSearchFilter(searchFilter)

    }

     render(){
         //items = this.props.items;
    return(
            <nav className="nav-wrapper">
                <div className="container">                    
                    <div className="navigationbar">    
    <div className="homeDiv"><Link to="/"><img className="homeIcon" src={homeIcon}/></Link></div>
    <div className="cartDiv"><Link to="/cart"><img className="cartImg" src={cartIcon}/><span className="cartCount">{this.props.addedItems.length}</span></Link></div>
    <div className="searchDiv"><img className="cartImg" onClick={this.handleSearch.bind(this)} src={searchIcon}/></div>
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
        addToCart: (id)=>{dispatch(addToCart(id))},
        handleSearchFilter : (searchFilter) =>{dispatch({type:"HANDLE_SEARCHFILTER",value:searchFilter})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)