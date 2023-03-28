import React, { useState } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardHeader } from '@material-ui/core';
import "./DisplayItems.css"
const DisplayItems = ({item}) => {
  return (
    
    <>  
    <Card  className='CardContainer' >
        <CardHeader
        title={"Item ID: " +  (item.itemID)}
       
        />
        <CardMedia style={{height:"200px",width:"200px",marginLeft:"20%"}}
          image={item.item_url}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Price : {item.InitialPrice} eth
          </Typography>
          
        </CardContent>
    </Card>
    </>
  )
}

/*


*/
export default DisplayItems
