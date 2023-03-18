
import Web3 from "web3";
import Auction from './truffle_abis/Auction.json';
import { Component} from 'react';
import { connect } from "react-redux";
import Main from "./Components/Main";
import { BrowserRouter as Router, Routes, Route , Navigate  } from 'react-router-dom';
import Auctioneer from "./Components/Auctioneer/Auctioneer";
import Owner from "./Components/Owner/Owner";
import RegisterAuctioneer from "./Components/Auctioneer/RegisterAuctioneer";
import Auction_Comp from "./Components/Auction/Auction"
class App extends Component{

  async UNSAFE_componentWillMount(){
    await this.LoadWeb3();
    await this.LoadBlockChain();
  }
  
    LoadWeb3 = async()=>{
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

   LoadBlockChain=async()=>{
     
    const web3 = window.web3
    const account = await web3.eth.getAccounts(); // getting account that is connected
   
    this.setState({connected_account:account}); // set current metamask account to state
    this.props.Redux_setConnectedAccount("setConnectedAccount",account); // save to Redux

    //Ganache Network ID
    const networkID = await web3.eth.net.getId();

    //Loading Contract
    const ContractData = Auction.networks[networkID];
    
    if(ContractData){
      const cont_addr = new web3.eth.Contract(Auction.abi,ContractData.address);
      this.setState(this.state.auction_contract=cont_addr); // get contract and store it to state
      this.props.Redux_setContract("setAuctionContract",cont_addr); // save to Redux
      this.GetAuctionOwner(); // get the address of the account that deployed the contract
      this.setState({loading : false});
    }
    else
    {
      console.log("NoData");
    }
  }

   GetAuctionOwner = async ()=>
  {
    
    const addr = await this.state.auction_contract.methods.GetOwner().call(); // get address from contract
    this.setState({auction_owner:addr}); // set owner address to state
    this.props.Redux_setOwner("setAuctionOwner",addr); // save to redux
    
    
  }

  constructor(props){
    super(props)
    this.state={
      auction_owner : '0x00',
      auction_contract:{},
      connected_account:'0x00',
      loading:true
      
    };
  }
  render(){
    let content
    {
      this.state.loading ?content = <h1>Wait Please , Loading Data... </h1>
      :
      content=
      <Router>
          <div>
            <Routes>
              <Route exact path ="/" element={<Main/>}></Route>
              <Route exact path ="/RegisterAuctioneer" element={<RegisterAuctioneer/>}></Route>
              <Route exact path ="/Auctioneer" element={<Auctioneer/>}></Route>
              <Route exact path ="/Owner" element={<Owner/>}></Route>
              <Route exact path ="/Auction" element={<Auction_Comp/>}></Route>
            </Routes>
          </div>
        </Router>
    }
  return(
    <div>
      {content}
    </div>
    
  );
  }
}

const mapStatetoProps=(props)=>{
     return{
        owner_acc_store : props.auction_owner, // get state from redux
        connected_acc_store:props.connected_account
     }
}
const mapPropstoState =(dispatch)=>{
    return{
        Redux_setOwner :(type,obj)=>dispatch({type,obj}), // set state in redux
        Redux_setContract :(type,obj)=>dispatch({type,obj}), // set state in redux
        Redux_setConnectedAccount :(type,obj)=>dispatch({type,obj}) // set state in redux
    }
}
export default connect(mapStatetoProps,mapPropstoState)(App);

