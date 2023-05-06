import React, { useEffect, useState } from 'react'
import Table from '../BidTable/Table';
import { useSelector , useDispatch} from 'react-redux';
import Web3 from "web3";
import './Biditem.css';

const BidItem = (props) => {
  const dispatch = useDispatch() 
  const auction_contract = useSelector(state=>state.auction_contract);  
  const connected_account = useSelector(state=>state.connected_account)
  const[bid_placed,setbid_placed] = useState(0);
  const [highestBid,sethighestBid] = useState(0);
  const [highestBidder,sethighestBidder] = useState("0x00");
  const [prevHigestBid,setprevHigestBid] = useState(0);
  const [prevHigestBidder,setprevHigestBidder] = useState("0x00");


  const onchangeBidPlacedHandler = (event)=>
  {
    setbid_placed(event.target.value);
  }
  const onSubmitHandler= async (event)=>
  {
     event.preventDefault();
     //this.props.onBidPlaced(this.state.bid_placed); // send amount back to Main.js
    await PlaceBid();
     
  }
  const PlaceBid = async ()=>{
    await fetch_account();
    const amount = bid_placed;
    const amount_wei = await Web3.utils.toWei(amount,'ether');
    console.log("amount: " + amount_wei);
    if(amount_wei > highestBid && amount_wei > props.initPrice)
    {
      await auction_contract.methods.Bid(amount_wei , props.AuctioneerAddr,props.ItemID).send({
        from:connected_account[0],
        value: amount_wei
      }).on('transactionHash',(hash)=>{});
          
      onGetBidsHandler();
    }
    else{
      window.alert('Bid Amount is Low then the Current Highest');
    }
    setbid_placed(0);
  }
  const fetch_account = async()=>{
    const web3 = window.web3
    const account = await web3.eth.getAccounts(); // getting account that is connected
    dispatch({type:"setConnectedAccount",obj:account});
   }
  const onGetBidsHandler = async()=>
  {
    const res = await auction_contract.methods.getCurrentHighestBid(props.AuctioneerAddr,props.ItemID).call();
    const amount_eth1 = await Web3.utils.fromWei(res[1],'ether');
    console.log("ret1: " + res[0]);
    console.log("ret2: " + amount_eth1);
   
    const res2 = await auction_contract.methods.getPrevHighestBid(props.AuctioneerAddr,props.ItemID).call();
    const amount_eth2 = await Web3.utils.fromWei(res2[1],'ether');
    console.log("p1: " + res2[0]);
    console.log("p2: " + amount_eth2);
    sethighestBid(amount_eth1);
    sethighestBidder(res[0]);
    setprevHigestBid (amount_eth2);
    setprevHigestBidder(res2[0]);

  }
  useEffect(()=>{
    onGetBidsHandler();
  },[props.ItemID])
  return (
    <div>

            <div className="Main-Container">
              {/*<button onClick={onGetBidsHandler}>GetBIDS</button>*/}
                <h3>Bid Item Initial Price: {props.initPrice}</h3>
                    <div className="BID">
                        <img src={props.img} width="250" height="250"/> 
                        <form onSubmit={onSubmitHandler} className="FORM">
                            <input type="number"  value ={bid_placed} step="0.01" min="0.01" onChange={onchangeBidPlacedHandler}/>
                            <button type="submit"> Place Bid </button>
                        </form>
                        
                    </div>
                    <Table
                        highestBid = {highestBid}
                        highestBidder = {highestBidder}
                        prevHigestBid = {prevHigestBid}
                        prevHigestBidder=  {prevHigestBidder}
                        />
                </div>
      
    </div>
  )
}

export default BidItem
