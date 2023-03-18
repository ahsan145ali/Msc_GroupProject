import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import BidItem from './BidItem/BidItem';

const Auction = () => {
  const cc_account = useSelector(state=>state.connected_account)
  const owner_account = useSelector(state=>state.auction_owner)
  const auction_contract = useSelector(state=>state.auction_contract);  
  const AuctionItems = useSelector(state=>state.AuctionItems);  
  return (
    <div>
      {console.log(AuctionItems)}
      <h1>Auction</h1>

      <div className="Bids-Container">
                    <BidItem 
                            img = {AuctionItems[0].item_url} 
                            /*onBidPlaced= {onBidPlacedHandler} 
                            highestBid = {this.props.highestBid}
                            highestBidder = {this.props.highestBidder}
                            lowestBid = {this.props.lowestBid}
                            lowestBidder=  {this.props.lowestBidder}*/
                            />
                
             </div>

    </div>
  )
}

export default Auction
