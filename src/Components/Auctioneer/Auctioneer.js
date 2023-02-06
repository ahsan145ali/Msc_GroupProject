import React from 'react'
import {useNavigate} from 'react-router-dom';
const Auctioneer = () => {
    const navigate = useNavigate();
    const handleMainClick = ()=>
    {
        navigate("/");
    }

  return (
    <div>
        <button onClick={handleMainClick}>Main</button>
      <h1>Auctioneer</h1>
    </div>
  )
}

export default Auctioneer
