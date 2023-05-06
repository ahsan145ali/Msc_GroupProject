import React, { useEffect } from 'react'
import Navbar from "./Navbar"
import {useNavigate} from 'react-router-dom';
import { useSelector , useDispatch} from 'react-redux';
import "./Main.css"
const Main = ({GetAuctionOwner}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch() 

  const AuctionStatus = useSelector(state=>state.AuctionStatus); 
  const AuctionItems = useSelector(state=>state.AuctionItems); 

  const handleAuctioneerClick =()=>
  {
    navigate('/RegisterAuctioneer');
  }
  const handleBidderClick=()=>
  {
    if(AuctionStatus == false){
      if(AuctionItems.length > 0){
        navigate('/Auction');
      }else{
        window.alert("Auction Has Not Started")
      }
     
  }
    else{
      navigate('/AuctionEnd')
    }
  }
  const handleOwnerClick=()=>
  {
    navigate('/Owner');
  }
 useEffect(()=>{
   const fetch_account = async()=>{
    const web3 = window.web3
    const account = await web3.eth.getAccounts(); // getting account that is connected
    dispatch({type:"setConnectedAccount",obj:account});
   }
   fetch_account();
 },[])
  return (
    <div >
       <Navbar/>
       <div className='MainContent'>
      <h1>Main</h1>
      <button onClick={handleAuctioneerClick} className="B_Auctioneer">Auctioneer</button>
      <button onClick={handleBidderClick} className="B_Auction">Auction</button>
      <button onClick={handleOwnerClick} className="B_Owner">Owner</button>
      </div>
    </div>
  )
}

export default Main
