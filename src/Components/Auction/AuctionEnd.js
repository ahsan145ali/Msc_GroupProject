import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import DisplayListedItems from './DisplayListedItems'
import {Grid} from "@material-ui/core";

const AuctionEnd = () => {
    const dispatch = useDispatch() 
    const AuctionItems = useSelector(state=>state.AuctionItems); 

    const auction_contract = useSelector(state=>state.auction_contract);


    useEffect(()=>{
        dispatch({type:"setAuctionStatus",obj:true});
    },[])
  return (
    <div>
      <h2>Auction Has Ended</h2>
      <h3> Claim Refunds </h3>
      {console.log("I: " + AuctionItems)}
      <Grid   container direction="row" justifyContent="flex-start" alignItems="center" spacing={0}>
        {
             [...AuctionItems].map((e)=>(
             
                <DisplayListedItems  
                AuctioneerAddr = {e.auctioneer_addr}
                ItemID = {e.itemID}
                item_url = {e.item_url}
                highestBidder = {e.highest_Bidder}/>
                ))
        }
        </Grid>
    </div>
  )
}

export default AuctionEnd
