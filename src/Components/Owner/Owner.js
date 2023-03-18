import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import GetAddrItems from './GetAddrItems';
import { Button } from '@material-ui/core';
import {Grid} from "@material-ui/core";
const Owner = () => {
    const navigate = useNavigate();
    const cc_account = useSelector(state=>state.connected_account)
    const owner_account = useSelector(state=>state.auction_owner)
    const auction_contract = useSelector(state=>state.auction_contract);  
    const AuctionItems = useSelector(state=>state.AuctionItems);  
    const [AddrCount,setAddrCount] = useState(0);
    const [ShowAddr,setShowAddr] = useState(false);
    const [RegAddresses,setRegAddresses] = useState([]);

    const handleMainClick = ()=>
    {
        navigate("/");
    }

    const GetAddressCount = async ()=>
    {
      const res = await auction_contract.methods.GetAddressesCount().call().then((receipt)=>{
        console.log("R: " , receipt)
        setAddrCount(receipt);
      });

    }

    const getAddresses = async()=>
    {
       const res = await auction_contract.methods.GetAddresses().call();
       setRegAddresses(res);
    }
    const HandleGetAddr = async ()=>
    {
      console.log("C2: " + AddrCount);
      await getAddresses();
      setShowAddr(true);
      console.log("Items: " + AuctionItems.length)
    }
    useEffect(()=>{
      /*if(cc_account != owner_account){
        window.alert("Not the owner")
        navigate("/");
      }*/
      GetAddressCount();
      
    },[])
   
    let Dis
    {
      ShowAddr==false ? 
      Dis = <h1>NO ADDRR</h1>
      :
      
      Dis = 
       [...RegAddresses].map((element) => {
       <p>sas</p>
      })
    }
  return (
    <div>
      <button onClick={handleMainClick}>Main</button>
      <h1>Owner</h1>
      <button onClick={HandleGetAddr}>Get Addr</button>

      <div>
        {
           [...RegAddresses].map((element) => (
              <div key={element}>
              <GetAddrItems Addr = {element}/>
              </div>
           ))
        }
      </div>
      
    </div>
  )
}

export default Owner
