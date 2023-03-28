import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import DisplayAddrItems from './DisplayAddrItems';
import "./GetAddrItems.css";

const GetAddrItems = ({Addr}) => {
  const auction_contract = useSelector(state=>state.auction_contract);  
  const [Items,setItems] = useState([{}])
  const [showItems , setShowItems] = useState(false);
  
  const HandleGetRegItems = async ()=>{
    const res =  await auction_contract.methods.GetBidItem(Addr).call().then((receipt)=>{
      setItems(receipt);
    })

    if(showItems)
    setShowItems(false);
    else
    setShowItems(true);
  }
  let Show
  {
    showItems == false? Show = null :
    Show = <DisplayAddrItems Items = {Items}/>
  }
  return (
    <div>
            
          <button onClick={HandleGetRegItems} id="Addresses">{Addr}</button>
          {Show}
    </div>
  )
}

export default GetAddrItems
