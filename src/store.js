const initialState = {
    loading : true,
    customerDetails : [],
    address : [],
    addressFlag : true
}

const reducer = (state=initialState,action)=>{
    switch (action.type) {
    case "UPDATEADDRESS": {
            return {
              ...state,
              address: action.value,
              addressFlag : false
            };
          }
    case "UPDATECUSTOMERDETAILS": {
      return{
        ...state,
        loading : false,
        customerDetails : action.value
      };
    }
    default:
      return state;
}    
}

export default reducer;