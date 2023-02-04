import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {

  const owner = useSelector(state=>state.auction_owner)
  const cc_account = useSelector(state=>state.connected_account)
  return (
    <div> 
        <div className='Owner_addr'>
          <p>Auction Owner : {owner}</p>
        </div>
        <div className='Owner_addr'>
          <p>Current Account : {cc_account}</p>
        </div>


      
    </div>
  )
}

export default Navbar
