import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import {useNavigate   } from 'react-router-dom';
const RegisterAuctioneer = () => {

  const navigate = useNavigate();
  const auction_contract = useSelector(state=>state.auction_contract);
  const connected_acc = useSelector(state=>state.connected_account);
  const [status,setStatus] = useState(false);

  const handleRegisterClick = async ()=>
  {
    if(status == false)
    {
    console.log(connected_acc[0]);
     await auction_contract.methods.RegisterAsAuctioneer().send({
      from:connected_acc[0]
     }).then((receipt)=>{
                setStatus(true)
                console.log("R: " , receipt)
                navigate('/Auctioneer');
              })
    }
    else{
      console.log("Already Registered");
    }
  }
  const GetRegistrationStatus= async ()=>{
    const stat = await auction_contract.methods.GetRegistrationStatus(connected_acc[0]).call();
    setStatus(stat);
    console.log(stat);
  }
  useEffect(()=>{

   GetRegistrationStatus();
    if(status == true){
      navigate('/Auctioneer');
    }
  },[status])
  return (
    <div>
      <h1>Register Auctioneer</h1>
      <button onClick={handleRegisterClick}>Register</button>
      <button onClick={GetRegistrationStatus}>Stauts</button>
    </div>
  )
}

export default RegisterAuctioneer
