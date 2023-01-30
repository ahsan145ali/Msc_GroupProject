import './App.css';
import Web3 from "web3";
import Auction from './truffle_abis/Auction.json';
import { Component, useEffect , useState } from 'react';
/*
class App extends Component {

  // Load web3 

  async UNSAFE_componentWillMount()
  {
    await this.LoadWeb3();
    await this.LoadBlockChain();
  }

  async LoadWeb3(){
    if(window.ethereum)
    {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if(window.web3)
    {
      window.web3 = new Web3 (window.web3.currentProvider)
    }
    else{
      window.alert('No Wallet Detected');
    }
  }
  async LoadBlockChain(){
    const web3 = window.web3
    const account = await web3.eth.getAccounts(); // getting account that is connected
    //this.setState({connected_account:account});

    //Ganache Network ID
    const networkID = await web3.eth.net.getId();

    //Loading Contract
    const ContractData = Auction.networks[networkID];

    if(ContractData){
      console.log("HERE");
      const cont = new web3.eth.Contract(Auction.abi,ContractData.address);
     
      const va = await cont.methods.GetVal().call();
      console.log("VAL: " + va);
    }
    else
    {
      console.log("Nod Data");
    }
  }

  // states
  constructor(props){
    super(props)
    this.state ={

    };
  }
  // React Part
  render(){
    return (
      <div>
        <p>Test</p>
      </div>
    );
  }
  
}*/

function App(){
  useEffect(()=>{

    //await this.LoadWeb3();
    async function LoadWeb3(){
      if(window.ethereum)
      {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      }
      else if(window.web3)
      {
        window.web3 = new Web3 (window.web3.currentProvider)
      }
      else{
        window.alert('No Wallet Detected');
      }
    }
    async function LoadBlockChain(){
      const web3 = window.web3
      const account = await web3.eth.getAccounts(); // getting account that is connected
      setstates(states.accounts = account);
  
      //Ganache Network ID
      const networkID = await web3.eth.net.getId();
  
      //Loading Contract
      const ContractData = Auction.networks[networkID];
  
      if(ContractData){
        const cont = new web3.eth.Contract(Auction.abi,ContractData.address);
        setstates(states.auction_contract = cont);
      }
      else
      {
        console.log("No Data");
      }
    }
    LoadWeb3();
    LoadBlockChain();
  
  },[])
  const [states,setstates] = useState({
    current_connected_account : '0x00', // current metamask conencted account
    auction_owner:'0x00', // owner of the item
    auction_contract: {}, // auction contract
    bid_placed:0, // current bid placed
    prev_addr:'0x0000000000000',// address of previous highest bidder
    curr_addr:'0x0000000000000', // adddress of current highest bidder
    prev_amount:'0',// previous highest bid amount
    curr_amount:'0',// current highest bid amount
    loading : true, // to use for when waiting for a process to complete
  })
  return(
    <div>
      Auction Dapp
    </div>
  );
}

export default App;
