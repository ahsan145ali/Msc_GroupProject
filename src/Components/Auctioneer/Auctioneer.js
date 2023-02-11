import React from 'react'
import {useNavigate} from 'react-router-dom';
import Navbar from '../Navbar';
import dummyData from '../../utils/dummydata'
import './auctioneer.css'
import { useSelector } from 'react-redux';


const Items = ({ itemId, auctioneer, image, initialPrice, currentBid}) => {
  const cc_account = useSelector(state=>state.connected_account)

  if (cc_account == auctioneer) {
    return (
      <li className='item'>
        <img src={image} height='100px' width="100px"></img>
        <div className='itemDetails'>
          <span>{itemId}</span>
          <p className='auctioneer'>{auctioneer}</p>
          <div>
            <p className='initialP'>{initialPrice}</p>
            <p className='currP'>{currentBid}</p>
          </div>
  
        </div>
      </li>
    )
  }
  else {
    return null
  }
 
}

const Auctioneer = () => {
    const navigate = useNavigate();
    const handleMainClick = ()=>
    {
        navigate("/");
    }



  return (
    <div>
      <Navbar/>
        <button onClick={handleMainClick}>Main</button>
      <h1>Auctioneer</h1>

      <div className='itemsWrapper'>
        <ul className='itemsList'>

          {dummyData.reverse().map((items, i) => (
            <Items key={i} {...items}/>
            ))}
        </ul>
      </div>
      
    </div>
  )
}

export default Auctioneer
