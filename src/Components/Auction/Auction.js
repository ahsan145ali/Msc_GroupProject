import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import BidItem from './BidItem/BidItem';

const Auction = () => {
  const cc_account = useSelector(state=>state.connected_account)
  const owner_account = useSelector(state=>state.auction_owner)
  const auction_contract = useSelector(state=>state.auction_contract);  
  const AuctionItems = useSelector(state=>state.AuctionItems); 
  const [counter, setCounter] = useState(3); 
  const [TotalItem,setTotalItems] = useState(AuctionItems.length);
  const [CurrentItem ,setCurrentItem]= useState(0);
  const [AuctionEnded , setAuctionEnded] = useState(false);
  const NextItem = ()=>{
    console.log("C: " + CurrentItem +" T: " + TotalItem)
    if(CurrentItem < TotalItem - 1){
      setCurrentItem(CurrentItem+1);
      setCounter(3);
    }

    
  }
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  return (
    <div>
      {console.log(AuctionItems)}
      {console.log("Timer: " + counter)}
      {counter == 0? NextItem():null}
      <h1>Auction</h1>
      <h3>Time: {counter}</h3>
      {counter ==0 ?  <h1>Auction Has Ended</h1>:
      <div className="Bids-Container">
                    <BidItem 
                            img = {AuctionItems[CurrentItem].item_url} 
                            highestBid = {AuctionItems[CurrentItem].highest_bid}
                            highestBidder = {AuctionItems[CurrentItem].highest_Bidder}
                            prevHigestBid = {AuctionItems[CurrentItem].prev_higest_bid}
                            prevHigestBidder=  {AuctionItems[CurrentItem].prev_higest_bidder}
                            />
                
             </div>}

    </div>
  )
}

export default Auction
