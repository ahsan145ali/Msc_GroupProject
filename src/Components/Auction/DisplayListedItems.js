import React, { useEffect, useState } from 'react'
import DisplayItems from '../Auctioneer/DisplayItems'
import {Grid} from "@material-ui/core";
import {useSelector, useDispatch} from 'react-redux'
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardHeader } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Web3 from "web3";

const DisplayListedItems = ({AuctioneerAddr,ItemID,item_url,highestBidder}) => {
    const auction_contract = useSelector(state=>state.auction_contract);  
    const cc_account = useSelector(state=>state.connected_account)
    const owner_account = useSelector(state=>state.auction_owner)
    const dispatch = useDispatch() 
    const [soldTo , setSoldTo] = useState("");

    const onGetRefundsHandler = async ()=>{
        if(cc_account != owner_account)
        {
            await auction_contract.methods.GetRefund().send({from:cc_account.toString()});
        }
        else{
          window.alert('Owner Can not Initate Refund');
        }
      }
      const onClaimBidsHandler = async ()=>{

        if(cc_account == owner_account)
        {
          await auction_contract.methods.TransferEthToOwner(soldTo,ItemID).send({from:cc_account.toString()});
        }
        else{
          window.alert("Only Auction Owner Can Claim");
        }
      }

      const GetWinnerAddr = async ()=>{
        const res = await auction_contract.methods.getCurrentHighestBid(AuctioneerAddr,ItemID).call();
        setSoldTo(res[0])
      }
      const onGetConnecetedAccountHandler = async ()=>{
        const web3 = window.web3
        const account = await web3.eth.getAccounts(); // getting account that is connected
        dispatch({type:"setConnectedAccount",obj:account});
    
      }
   useEffect(()=>{
        GetWinnerAddr()
        onGetConnecetedAccountHandler()
   },[])
  return (
    <div>
                    <button onClick={onGetRefundsHandler}>GetRefunds</button>
                    <button onClick={onClaimBidsHandler}>Claim Bids</button>    
                <div className='ItemContainer' key={ItemID}>
                    <img src={item_url} height='200px'/>
                     <div className='ItemInfoContainer'>
                        <h3 style={{height:"1px"}}>ID: {ItemID}</h3>
                        <h3 style={{height:"1px"}}>Sold To: {soldTo}</h3>
                     </div>

                </div>
              
    </div>
  )
}

export default DisplayListedItems