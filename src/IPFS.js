import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import './IPFS.css';
import { useSelector } from 'react-redux';
const API_KEY = "37263b6ecce944781d40"
const API_SECRET = "18e5166d23af25424f92dff9c99e0ac21f2148c830990e27c37c8e2d1da507bd";
const API_JWT = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwMjUwYTY1My1iNzdlLTQwYmEtYmU5Ny0zYzA3YjU5MjY4NzEiLCJlbWFpbCI6ImFoc2FuMTQ1YWxpQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIzNzI2M2I2ZWNjZTk0NDc4MWQ0MCIsInNjb3BlZEtleVNlY3JldCI6IjE4ZTUxNjZkMjNhZjI1NDI0ZjkyZGZmOWM5OWUwYWMyMWYyMTQ4YzgzMDk5MGUyN2MzN2M4ZTJkMWRhNTA3YmQiLCJpYXQiOjE2NzU2MjAyODV9.LV5BkxtOYwwV_tRp44FB5pOjO10UO3oTzbuQSjXRowA"
const access_img = "https://gateway.pinata.cloud/ipfs/";


const IPFS = ({hideForm, GetRegisteredItems}) => {

  const cc_account = useSelector(state=>state.connected_account)
  const auction_contract = useSelector(state=>state.auction_contract);  

    const [file, setFile] = useState()
    const [IPFSHash, setIPFSHASH] = useState('')
    const [showOptions , setShowOptions] = useState(false);
    const [initPrice,setInitPrice] = useState(0);
    const [pinBtn , setPinBtn] = useState("block");
    
  const handleFile=async () =>{
    if(file == null) { window.alert("No File Selected"); return;}
    console.log('starting')

    // initialize the form data
    const formData = new FormData()

    // append the file form data to 
    formData.append("file", file)
    // call the keys from .env



    // the endpoint needed to upload the file
    const url =  `https://api.pinata.cloud/pinning/pinFileToIPFS`

    const response = await axios.post(
      url,
      formData,
      {
          maxContentLength: "Infinity",
          headers: {
              "Content-Type": `multipart/form-data;boundary=${formData._boundary}`, 
              'pinata_api_key': API_KEY,
              'pinata_secret_api_key': API_SECRET

          }
      }
    )

  console.log(response)

  // get the hash
  setIPFSHASH(response.data.IpfsHash)
  setShowOptions(true);
  setPinBtn("none");
  }

  const handleRegisterItem = async()=>
    {
     await auction_contract.methods.RegisterBidItem(access_img+IPFSHash
                                              ,initPrice,0).send({
        from:cc_account[0]
       }).then((receipt)=>{
          console.log("Added Success");
          hideForm();
          GetRegisteredItems();
       })
    }

  const handlePriceChange = (event)=>
  {
    setInitPrice(event.target.value);
  }
  
  const handleSubmit = (event)=>
  {
    handleRegisterItem();
    event.preventDefault();
  }

  let form_inputs
  {
    !showOptions ? form_inputs = null
    :
    form_inputs = 
   <>
   <label>
    Initial Price: 
    <input  type="number" value={initPrice} onChange={handlePriceChange}></input>
   </label>
   <input type="submit" value="Submit" />
   </>
  }
  
  return (
    <div>
      <div className='FormContainer'>
      <form onSubmit={handleSubmit} className="MainForm">
        <label>
          Select File
          <input id='in' type="file" onChange={(event)=>setFile(event.target.files[0])}/>
        </label>
        <br></br>
        {form_inputs}
        
      </form>
      <button onClick={handleFile} style={{display:pinBtn}}>Pin</button>
      </div>
    </div>
  )
}

export default IPFS
