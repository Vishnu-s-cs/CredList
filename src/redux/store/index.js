import {createStore} from 'redux'

const balanceReducer = (state={balance:0,history:[]},action)=>{
    if (action.type === "ADD") {
        return {
            balance:state.balance + action.payload,
            history:[...state.history,action.payload]
        }
    }
    
    else return state

}

const store = createStore(balanceReducer)
export default store;