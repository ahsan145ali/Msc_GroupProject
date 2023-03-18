import React from 'react'
import Table from '../BidTable/Table';
import './Biditem.css';

const BidItem = (props) => {

  const onBidPlacedHandler = ()=>
  {

  }
  const onSubmitHandler= ()=>
  {

  }
  return (
    <div>

            <div className="Main-Container">
                <p>BID ITEM</p>
                    <div className="BID">
                        <img src={props.img} width="250" height="250"/> 
                        <form onSubmit={onSubmitHandler} className="FORM">
                            <input type="number"  value ={0/*this.state.bid_placed*/} step="0.01" min="0.01" onChange={onBidPlacedHandler}/>
                            <button type="submit"> Place Bid </button>
                        </form>
                        
                    </div>
                    <Table
                        highestBid = {props.highestBid}
                        highestBidder = {props.highestBidder}
                        prevHigestBid = {props.prevHigestBid}
                        prevHigestBidder=  {props.prevHigestBidder}
                        />
                </div>
      
    </div>
  )
}

export default BidItem
