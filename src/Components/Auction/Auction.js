import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import BidItem from './BidItem/BidItem';
import AuctionEnd from './AuctionEnd';

const Auction = () => {
  const navigate = useNavigate();
  const TimerPerItem = 20;
  const cc_account = useSelector(state=>state.connected_account)
  const owner_account = useSelector(state=>state.auction_owner)
  const auction_contract = useSelector(state=>state.auction_contract);  
  const AuctionItems = useSelector(state=>state.AuctionItems); 
  const AuctionStatus = useSelector(state=>state.AuctionStatus); 
  const [counter, setCounter] = useState(TimerPerItem); 
  const [TotalItem,setTotalItems] = useState(AuctionItems.length);
  const [CurrentItem ,setCurrentItem]= useState(0);


  const NextItem = ()=>{
    console.log("C: " + CurrentItem +" T: " + TotalItem)
    if(CurrentItem < TotalItem - 1 ){
      setCurrentItem(CurrentItem+1);
      setCounter(TimerPerItem);
    }
  }
  const EndScreen = ()=>{
    if(CurrentItem >= TotalItem-1){
      navigate("/AuctionEnd")
    }
    else{
      return;
    }
    
  }
  const onContBalanceHandler = async ()=>
  {
    const res = await auction_contract.methods.getContractBalance().call();
    console.log("Cont Balance: " + res);
  }
  useEffect(() => {
    if(AuctionStatus == false){
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);}else{
      navigate("/")
    }
    
  }, [counter]);

  return (
    <div>
      {/*<button onClick={onContBalanceHandler}>Get Cont Balance</button>*/}
      
      {counter == 0? NextItem():null}
      <h1>Auction</h1>
      <h3>Time: {counter}</h3>
      {counter ==0 ?  EndScreen():
      <div className="Bids-Container">
                    <BidItem 
                            img = {AuctionItems[CurrentItem].item_url} 
                            highestBid = {AuctionItems[CurrentItem].highest_bid}
                            highestBidder = {AuctionItems[CurrentItem].highest_Bidder}
                            prevHigestBid = {AuctionItems[CurrentItem].prev_higest_bid}
                            prevHigestBidder=  {AuctionItems[CurrentItem].prev_higest_bidder}
                            AuctioneerAddr = {AuctionItems[CurrentItem].auctioneer_addr}
                            ItemID = {AuctionItems[CurrentItem].itemID}
                            initPrice = {AuctionItems[CurrentItem].InitialPrice}
                            />
                
             </div>}

    </div>
  )
}

export default Auction
