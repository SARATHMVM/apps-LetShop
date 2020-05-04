import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'
import { Link } from 'react-router-dom'
import sortBy from 'lodash/sortBy'

 class Home extends Component{
 
    
    handleClick = (id)=>{
        this.props.addToCart(id); 
    }
    sortByPrice = () => {
        var prevState = this.props.items;
        var sortedValue = sortBy(prevState, ['price'])
        let ascendingSortFlag = true;
        let desendingSortFlag = false;
        let discountSortFlag = false;
        this.props.ascendingSort(sortedValue,discountSortFlag,ascendingSortFlag,desendingSortFlag)
    }
    sortByDesendingPrice = () => {
        var prevState = this.props.items;
        var sortedValue = sortBy(prevState, ['price'])
        let desendingSortFlag = true;
        let ascendingSortFlag = false;
        let discountSortFlag = false;
        this.props.ascendingSort(sortedValue.reverse(),discountSortFlag,ascendingSortFlag ,desendingSortFlag)
    }
    sortByDiscount = () => {
        var prevState = this.props.items;
        var sortedValue = sortBy(prevState, ['desc'])
        let discountSortFlag = true;
        let desendingSortFlag = false;
        let ascendingSortFlag = false;
        this.props.discountSort(sortedValue,discountSortFlag,ascendingSortFlag,desendingSortFlag)
    }
    render(){
        let itemList = this.props.items.map(item=>{
            return(
                <div className="card" key={item.id}>
                        <div className="card-image">
                            <img src={item.img} alt={item.title}/>
                        </div>
                        <div className="card-content">
                            <span className="card-title">{item.title}</span>
                            <p className="discount">{item.desc}</p>
                            <p><b>₹{item.price}</b><b className="underlined">{" " + item.orgPrice}</b></p>
                            <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={()=>{this.handleClick(item.id)}}><i className="material-icons">Add to cart</i></span>
                        </div>
                 </div>

            )
        })

        return(
            <div className="container">
                <div className="filter">
                <span>Sort By</span>
                <span className={this.props.ascendingSortFlag ? "filterSpanHigh" :"filterSpan"} onClick={this.sortByPrice}>Price:High-Low</span>
                <span className={this.props.desendingSortFlag ? "filterSpanHigh" :"filterSpan"} onClick={this.sortByDesendingPrice}>Price:Low-High</span>
                <span className={this.props.discountSortFlag ? "filterSpanHigh" :"filterSpan"} onClick={this.sortByDiscount}>Discount</span>
                </div>
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
      items: state.items,
      ascendingSortFlag: state.ascendingSortFlag,
      desendingSortFlag: state.desendingSortFlag,
      discountSortFlag: state.discountSortFlag

    }
  }
const mapDispatchToProps= (dispatch)=>{
    return{
        addToCart: (id)=>{dispatch(addToCart(id))},
        ascendingSort: (value,discountSortFlag,ascendingSortFlag,desendingSortFlag)=>{dispatch({type: 'ASCENDING_SORT',value:value,discountSortFlag:discountSortFlag,ascendingSortFlag:ascendingSortFlag,desendingSortFlag:desendingSortFlag})},
        discountSort: (value,discountSortFlag,ascendingSortFlag,desendingSortFlag)=>{dispatch({type: 'DISCOUNT_SORT',value:value,discountSortFlag:discountSortFlag,ascendingSortFlag:ascendingSortFlag,desendingSortFlag:desendingSortFlag})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)