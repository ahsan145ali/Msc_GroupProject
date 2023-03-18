import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import Navbar from '../Navbar';
import './auctioneer.css'
import { useSelector } from 'react-redux';
import DisplayItems from './DisplayItems';
import {Grid} from "@material-ui/core";
import IPFS from '../../IPFS';

const Auctioneer = () => {
  const cc_account = useSelector(state=>state.connected_account)
  const auction_contract = useSelector(state=>state.auction_contract);  
  const [Items,setItems] = useState([{}])
  const [showIPFS , setShowIPFS] = useState(false);

    const navigate = useNavigate();
    const handleMainClick = ()=>
    {
        navigate("/");
    }
  const handleRegisterItem = async()=>
    {
      setShowIPFS(true);
    }

    const GetRegisteredItems = async()=>{
      
        const res =  await auction_contract.methods.GetBidItem(cc_account[0]).call().then((receipt)=>{
          console.log("R: " , receipt)
          setItems(receipt);
        })

        console.log("Res:  " , Items);
    }

    const hideForm = ()=>
    {
      setShowIPFS(false);
    }
    let IPFS_Store
    {
      showIPFS? IPFS_Store = <IPFS hideForm={hideForm} GetRegisteredItems={GetRegisteredItems}/>
      :
      IPFS_Store = null;
    }

   useEffect(()=>{
    GetRegisteredItems();
   },[])
  return (
    <div>
      <Navbar/>
        <button onClick={handleMainClick}>Main</button>
      <h2>Registered Items</h2>
      <button onClick={handleRegisterItem}>Register Item</button>
       {IPFS_Store}
      <Grid   container direction="row" justifyContent="flex-start" alignItems="center" spacing={20}>
          {
            
            [...Items].map((e)=>(
              
              <Grid item xs={3}> 
              <DisplayItems item={e}/>
              </Grid>
              
              ))
          }
      </Grid>
    
    
    </div>
  )
}

export default Auctioneer
