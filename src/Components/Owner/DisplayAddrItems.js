import React, { useEffect, useState } from 'react'
import DisplayItems from '../Auctioneer/DisplayItems'
import {Grid} from "@material-ui/core";
import {useSelector, useDispatch} from 'react-redux'
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardHeader } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import './DisplayAddrItems.css';

const DisplayAddrItems = ({Items}) => {

  const [buttonStatus,setbuttonStatus] = useState(false);
    const dispatch = useDispatch() 
    const HandleAddItem = (item)=>
    {
        console.log(item.itemID)
        console.log(item.InitialPrice)
        console.log(item.auctioneer_addr);
        dispatch({type:"setAuctionItem",obj:item});
        setbuttonStatus(true);

    }
  return (
    <div>
      <div className='MainDiv'>
      <Grid   container direction="row" justifyContent="flex-start" alignItems="center" spacing={0}>
        {
             [...Items].map((e)=>(
             
                <div className='ItemContainer' key={e.itemID}>
                    <img src={e.item_url} height='200px'/>
                     <div className='ItemInfoContainer'>
                        <h3 style={{height:"1px"}}>ID: {e.itemID}</h3>
                        <h3 style={{height:"1px"}}>price: {e.InitialPrice}</h3>
                        <button onClick={()=>HandleAddItem(e)} style={{marginTop:'5px'}} disabled={buttonStatus}>ADD</button>
                     </div>
                </div>
              
                ))
        }
      </Grid>
      </div>
    </div>
  )
}

export default DisplayAddrItems
