import React from 'react'
import Navbar from "./Navbar"
import {useNavigate} from 'react-router-dom';
const Main = () => {
  const navigate = useNavigate();

  const handleAuctioneerClick =()=>
  {
    navigate('/RegisterAuctioneer');
  }
  const handleBidderClick=()=>
  {
    navigate('/Bidder');
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
