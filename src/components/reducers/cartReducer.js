import Item1 from '../../images/apple.jpeg'
import Item2 from '../../images/samsung.jpeg'
import Item3 from '../../images/samgalaxy.jpeg'
import Item4 from '../../images/samsung.jpeg'
import Item5 from '../../images/samsungs20.jpg'
import Item6 from '../../images/samlap.jpeg'
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING,DISCOUNT_SORT,ASCENDING_SORT,SUB_SHIPPING } from '../actions/action-types/cart-actions'
import { act } from 'react-test-renderer'


const initState = {
    items: [
        {id:1,title:'item1', desc: "37% off", orgPrice:22500, price:13999,img:Item1},
        {id:2,title:'item2', desc: "46% off", orgPrice:37500, price:35999,img: Item2},
        {id:3,title:'item3', desc: "36% off", orgPrice:99500, price:84999,img: Item3},
        {id:4,title:'item4', desc: "41% off", orgPrice:11000, price:9999,img:Item4},
        {id:5,title:'item5', desc: "50% off", orgPrice:41000, price:39990,img: Item5},
        {id:6,title:'item6', desc: "52% off", orgPrice:8000, price:7099,img: Item6},
        {id:7,title:'item7', desc: "37% off", orgPrice:17000, price:13999,img:Item1},
        {id:8,title:'item8', desc: "46% off", orgPrice:41000, price:35999,img: Item2},
        {id:9,title:'item9', desc: "36% off", orgPrice:31000, price:84999,img: Item3},
        {id:10,title:'item10', desc: "41% off", orgPrice:61000, price:9999,img:Item4},
        {id:11,title:'item11', desc: "50% off", orgPrice:71000, price:39990,img: Item5},
        {id:12,title:'item12', desc: "52% off", orgPrice:9000, price:7989,img: Item6},
        {id:13,title:'item13', desc: "36% off", orgPrice:91000, price:84999,img: Item3},
        {id:14,title:'item14', desc: "41% off", orgPrice:13000, price:9999,img:Item4},
        {id:15,title:'item15', desc: "50% off", orgPrice:43000, price:39990,img: Item5},
        {id:16,title:'item16', desc: "52% off", orgPrice:12000, price:7499,img: Item6}
    ],
    addedItems:[],
    total: 0,
    ascendingSortFlag: false,
    desendingSortFlag: false,
    discountSortFlag: false

}
const cartReducer= (state = initState,action)=>{
   debugger;
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.price 
                  }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type=== ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 6
          }
    }

    if(action.type=== SUB_SHIPPING){
        return{
            ...state,
            total: state.total - 6
        }
  }
  if(action.type === ASCENDING_SORT){
    return{
        ...state,
        items : action.value,
        discountSortFlag : action.discountSortFlag,
        ascendingSortFlag : action.ascendingSortFlag,
        desendingSortFlag : action.desendingSortFlag

    }
}
if(action.type === DISCOUNT_SORT){
    return{
        ...state,
        items : action.value,
        discountSortFlag : action.discountSortFlag,
        ascendingSortFlag : action.ascendingSortFlag,
        desendingSortFlag : action.desendingSortFlag
    }
}

  else{
    return state
    }
    
}

export default cartReducer
