import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import "./Navbar.css"
const Navbar = () => {

  const owner = useSelector(state=>state.auction_owner)
  let cc_account = useSelector(state=>state.connected_account)

  useEffect(()=>{
    
  })
  return (
    <div className='M'> 
        <div className='Owner'>
          <div className="Owner-details">
                        <p> <span>OWNER</span></p>
                        <p> <span>{owner}</span></p>
           </div>
        </div>
        <div className='Bidder'>
          <div className="Bidder-details">
                    <p>Cuurent Account</p>
                    <p>{cc_account}</p>
            </div>   
        </div>


      
    </div>
  )
}

export default Navbar
