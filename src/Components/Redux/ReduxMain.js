import { createStore } from "redux";
const redux = require('redux');

const initialState = {
    auction_owner:"0x99",
    auction_contract:{},
    connected_account:"0x11"
}
const TaskReducer = (state = initialState,action)=>
{
    if(action.type==="setAuctionOwner"){
     
        
        state.auction_owner = action.obj; 
        
       
    }
    else if(action.type==="setAuctionContract"){

        state.auction_contract = action.obj;
        
    }
    else if(action.type==="setConnectedAccount"){

        state.connected_account = action.obj;
        
    }
    return state;
};

const store = createStore(TaskReducer);
const TaskSubscriber = () =>{}

export default store;