import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IPFS from '../../IPFS';
import RegisterAuctioneer from '../Auctioneer/RegisterAuctioneer';

const Owner = () => {

  const navigate = useNavigate();
  const connected_acc = useSelector(state=>state.connected_account);
  const auction_contract = useSelector(state=>state.auction_contract);  
  const [numAddresses, setNumAddresses] = useState(null)
  const [registeredAuctioneers, setRegisteredAuctioneers] = useState([])
  const [isAddressVisible, setIsAddressVisible] = useState(false)



  
  useEffect(()=>{
    getRegisteredAddresses()
  },[])

  const handleMainClick = ()=>
  {
      navigate("/");
  }

  const handleAddressClick = ()=>
  {

  }

  const getRegisteredAuctioneers = async () => {

    await auction_contract.methods.GetAddressesCount().call({
      from: connected_acc[0]
    }).then((receipt) => {

      console.log("R: ", receipt)
      setNumAddresses(receipt)
    })

    
  }

  const getRegisteredAddresses = async (event) => {
    let arr = []
    //setRegisteredAuctioneers([])
    for (let i = 0; i < numAddresses; i++)
    {
      await auction_contract.methods.GetRegisteredAddresses(i).call({
        from:connected_acc[0]
      }).then((res) => {
        
        arr.push(res);
        setRegisteredAuctioneers(arr)
        setIsAddressVisible(true)
        //setRegisteredAuctioneers({ ...registeredAuctioneers }, res);
        console.log("res: " + res)
       // console.log("Arr: " + registeredAuctioneers);
 
      })  
    }  
    console.log("arr: " + registeredAuctioneers)
   // setRegisteredAuctioneers(arr);
    
    //event.preventDefault();
    
    }

    return (
      <>
        <div>
            <button onClick={handleMainClick}>Main</button>
            <h1>Owner</h1>
        </div>

        <div>
          <button onClick={getRegisteredAddresses}>View All Auctioneers</button>
        </div>
        <br />
        {isAddressVisible ?
          <div>
            {registeredAuctioneers && registeredAuctioneers.map((item,key) =>
              <>
                <button>
                {item}
                </button>
                <br />
                <br />
              </>
            )
            }
            </div>
            :
          <div />
        }
        
      </>
    )
}

export default Owner
