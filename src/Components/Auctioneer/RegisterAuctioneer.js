import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom';
const RegisterAuctioneer = () => {

    const navigate = useNavigate();
    useEffect(()=>{
        navigate('/Auctioneer');
    },)
  return (
    <div>
      <h1>Register</h1>
    </div>
  )
}

export default RegisterAuctioneer
