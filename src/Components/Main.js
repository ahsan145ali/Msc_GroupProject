import React from 'react'
import Navbar from "./Navbar"
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

const Main = () => {

  const navigate = useNavigate();

  const AuctionStatus = useSelector(state=>state.AuctionStatus); 

  const handleAuctioneerClick =()=>
  {
    navigate('/RegisterAuctioneer');
  }
  const handleBidderClick=()=>
  {
    if(AuctionStatus == false){
    navigate('/Auction');}
    else{navigate('/AuctionEnd')}
  }
  const handleOwnerClick=()=>
  {
    navigate('/Owner');
  }

  return (
    <div>
       <Navbar/>
      <h1>Main</h1>
      <button onClick={handleAuctioneerClick}>Auctioneer</button>
      <button onClick={handleBidderClick}>Auction</button>
      <button onClick={handleOwnerClick}>Owner</button>
    </div>
  )
}

export default Main
