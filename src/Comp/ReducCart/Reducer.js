
const arr=JSON.parse(localStorage.getItem("cartItem")) || [];
export const myReducer=(state=arr,action)=>{
    if(action.type==='ADD'){

        const exitIndex=state.findIndex((item)=>{
            return item.id === action.payload.id
        })
        if(exitIndex >=0){
            return state.map((item,index)=>
                index === exitIndex ? 
            {
               ...item,quantity:item.quantity +(action.payload.quantity || 1)
            } : item
            )
        } else{
            return state=[
                ...state,
                {...action.payload,quantity:action.payload.quantity || 1}
            ]
        }
    }else if(action.type==='IncQty'){
        return state.map((item,index)=>
            index===action.payload ? {...item,quantity:item.quantity+1} :item
        )
    }
    else if(action.type==='DecQty'){
        return state.map((item,index)=>
            index===action.payload && item.quantity > 1 ? {...item,quantity:item.quantity-1} :item
        )
    }else if(action.type==='DELETE'){
        const newData=[...state]
        newData.splice(action.payload,1)
        state=newData
    }
    return state
}