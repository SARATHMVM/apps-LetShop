import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'
import { Link } from 'react-router-dom'
import sortBy from 'lodash/sortBy'
import Main from './range'

 class Home extends Component{
    
    rangeFilter = setTimeout(() => {
        let minValue = document.querySelectorAll('input')[1].min;
        let maxValue = document.querySelectorAll('input')[0].max;
        let prevState = this.props.items;
        let rangeItems = [];
        prevState.map(function(item,index){
            if (item.price > minValue && item.price < maxValue) {
                rangeItems.push(item);            
              }
              
        })
        this.props.rangeFilterSort(rangeItems)        
    },1000);
    handleClick = (id)=>{
        this.props.addToCart(id); 
    }
    sortByPrice = () => {
        let itemSort = this.props.rangeSortFlag ? this.props.rangeItems : this.props.items;    
        var sortedValue = sortBy(itemSort, ['price'])
        let ascendingSortFlag = true;
        let desendingSortFlag = false;
        let discountSortFlag = false;
        this.props.rangeSortFlag ? this.props.ascendingSortRange(sortedValue,discountSortFlag,ascendingSortFlag,desendingSortFlag) 
        : this.props.ascendingSort(sortedValue,discountSortFlag,ascendingSortFlag,desendingSortFlag)
    }
    sortByDesendingPrice = () => {
        let itemSort = this.props.rangeSortFlag ? this.props.rangeItems : this.props.items;    
        var sortedValue = sortBy(itemSort, ['price'])
        let desendingSortFlag = true;
        let ascendingSortFlag = false;
        let discountSortFlag = false;
        this.props.rangeSortFlag ? this.props.ascendingSortRange(sortedValue.reverse(),discountSortFlag,ascendingSortFlag ,desendingSortFlag)
        : this.props.ascendingSort(sortedValue.reverse(),discountSortFlag,ascendingSortFlag ,desendingSortFlag)
    }
    sortByDiscount = () => {
        let itemSort = this.props.rangeSortFlag ? this.props.rangeItems : this.props.items; 
        var sortedValue = sortBy(itemSort, ['desc'])
        let discountSortFlag = true;
        let desendingSortFlag = false;
        let ascendingSortFlag = false;
        this.props.rangeSortFlag ? this.props.discountSortRange(sortedValue,discountSortFlag,ascendingSortFlag,desendingSortFlag)
        : this.props.discountSort(sortedValue,discountSortFlag,ascendingSortFlag,desendingSortFlag)
    }
    rangeFilter = () => {
        debugger;
        let minValue = document.querySelectorAll('input')[1].min;
        let maxValue = document.querySelectorAll('input')[0].max;
        let prevState = this.props.items;
        let rangeItems = [];
        prevState.map(function(item,index){
            if (item.price > minValue && item.price < maxValue) {
                rangeItems.push(item);            
              }
              
        })
        this.props.rangeFilterSort(rangeItems)
        console.log(rangeItems);
        console.log(minValue);
        console.log(maxValue);
        
    }
    render(){
        debugger;
        let itemSort = this.props.rangeSortFlag ? this.props.rangeItems : this.props.items;             
        let itemList = itemSort.map(item=>{
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
            <div>
                <div className="filterComponent">
                    <div className="boldFont">Filters</div>
                    <div><Main items={this.props.items}/></div>
                    <div className="rangeApply" onClick={this.rangeFilter}>Apply</div>
                </div>
                <div className="contentComponent">
                    <div className="filterScroll">
                    <span className="boldFont">Sort By</span>
                    <span className={this.props.ascendingSortFlag ? "filterSpanHigh" :"filterSpan"} onClick={this.sortByPrice}>Price:High-Low</span>
                    <span className={this.props.desendingSortFlag ? "filterSpanHigh" :"filterSpan"} onClick={this.sortByDesendingPrice}>Price:Low-High</span>
                    <span className={this.props.discountSortFlag ? "filterSpanHigh" :"filterSpan"} onClick={this.sortByDiscount}>Discount</span>
                    </div>
                    <div className="box">
                        {itemList}
                    </div>
                </div>
            </div>
            <footer className="footer">
                <p>@copyright</p>
            </footer>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
      items: state.items,
      ascendingSortFlag: state.ascendingSortFlag,
      desendingSortFlag: state.desendingSortFlag,
      discountSortFlag: state.discountSortFlag,
      rangeSortFlag : state.rangeSortFlag,
      rangeItems : state.rangeItems

    }
  }
const mapDispatchToProps= (dispatch)=>{
    return{
        addToCart: (id)=>{dispatch(addToCart(id))},
        rangeFilterSort: (rangeItems)=>{dispatch({type: 'RANGE_SORT',value:rangeItems})},
        ascendingSort: (value,discountSortFlag,ascendingSortFlag,desendingSortFlag)=>{dispatch({type: 'ASCENDING_SORT',value:value,discountSortFlag:discountSortFlag,ascendingSortFlag:ascendingSortFlag,desendingSortFlag:desendingSortFlag})},
        ascendingSortRange: (value,discountSortFlag,ascendingSortFlag,desendingSortFlag)=>{dispatch({type: 'ASCENDING_SORT',value:value,discountSortFlag:discountSortFlag,ascendingSortFlag:ascendingSortFlag,desendingSortFlag:desendingSortFlag})},
        discountSort: (value,discountSortFlag,ascendingSortFlag,desendingSortFlag)=>{dispatch({type: 'DISCOUNT_SORT',value:value,discountSortFlag:discountSortFlag,ascendingSortFlag:ascendingSortFlag,desendingSortFlag:desendingSortFlag})},
        discountSortRange: (value,discountSortFlag,ascendingSortFlag,desendingSortFlag)=>{dispatch({type: 'DISCOUNT_SORT',value:value,discountSortFlag:discountSortFlag,ascendingSortFlag:ascendingSortFlag,desendingSortFlag:desendingSortFlag})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)