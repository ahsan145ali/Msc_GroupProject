// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Auction
{
    struct Item
    {
       uint itemID;
       address auctioneer_addr;
       string item_url;
       uint InitialPrice;
       uint currentBid;
       address soldto_addr;
       uint highest_bid;
       address highest_Bidder;
       uint prev_higest_bid;
       address prev_higest_bidder;
    }

    address AuctionOwner; // address of auction owner
    mapping(address=>uint) bidders; // address of biders which map to the amount of bid placed
    mapping(address=>uint) Pending_returns; // address of all bidders that were outbidded and are eligible for a return amount
    
 address[] public RegisteredAuctioneersAddresses;
    mapping(address=>Item[]) public BidItems; // store BidItems
    mapping(address=>bool) public RegisteredAuctioneers; // register as an auctioneer
    
    modifier isAlreadyRegistered(){ // check if an address is already registered
       
       require(RegisteredAuctioneers[msg.sender] == false , 'Already Registered');
       _;
    }
       modifier isRegistered(){ // check if an address is registered as auctioneer
       
       require(RegisteredAuctioneers[msg.sender] == true , 'Not Registered as auctioneer');
       _;
    }
        modifier isOwner()
    {
        require(msg.sender == AuctionOwner, 'Not the Owner');
        _;
    }
        event BidPlace(
        address CurrentBidder,
        uint Current_BidAmount,
        uint Previous_BidAmount
    );

    event RecievedEth(
        address SentFrom,
        uint EthAmount
    );
    constructor()
    {
        AuctionOwner = msg.sender;
    }

    receive() external payable{
        //payable(Auction_Owner).transfer(msg.value);
        emit RecievedEth(msg.sender, msg.value);
    }
   
    function RegisterAsAuctioneer()public isAlreadyRegistered { // Register as an auctioneer
        RegisteredAuctioneers[msg.sender] = true;
        RegisteredAuctioneersAddresses.push(msg.sender);
    }

    // Registed a Bid Item
    function RegisterBidItem(string memory _item_url,uint _InitialPrice,uint _currentBid) public isRegistered {
        
        uint ItemNumber = BidItems[msg.sender].length; // get  length of current items of the auctioneer
        BidItems[msg.sender].push(Item(ItemNumber+1,msg.sender,_item_url,_InitialPrice,_currentBid,address(0),0,address(0),0,address(0))); // set item 

    }
    
    function Bid(uint amount,address Auctioneer , uint itemID) payable public {
        itemID = itemID-1;

        //require(block.timestamp < Creation_time + 2 days,'Auction Time Ended');
        if(amount >BidItems[Auctioneer][itemID].highest_bid){
            
            BidItems[Auctioneer][itemID].prev_higest_bid = BidItems[Auctioneer][itemID].highest_bid;
            BidItems[Auctioneer][itemID].prev_higest_bidder = BidItems[Auctioneer][itemID].highest_Bidder;

            BidItems[Auctioneer][itemID].highest_bid = amount;
            BidItems[Auctioneer][itemID].highest_Bidder = msg.sender;

            bidders[msg.sender] = amount;
            
            Pending_returns[BidItems[Auctioneer][itemID].prev_higest_bidder] += BidItems[Auctioneer][itemID].prev_higest_bid;
     
            emit BidPlace(BidItems[Auctioneer][itemID].highest_Bidder, BidItems[Auctioneer][itemID].highest_bid, BidItems[Auctioneer][itemID].prev_higest_bid);
        }
        else{
            revert('Amount too Low');
        }
    }
    function GetRefund() public payable{ 
            uint amount =  Pending_returns[msg.sender];
            uint contract_balance = address(this).balance;

            require(msg.sender != AuctionOwner , 'Owner can not Initiate Refund');
            require(amount > 0 , 'No Pending Returns');
            require(amount <= contract_balance , 'Not enough Funds In Contract');
            //require(msg.sender != highest_Bidder , 'Auction Winner Can not Claim Refund');

                Pending_returns[msg.sender] = 0;
                payable(msg.sender).transfer(amount);
        }

        /* Send the highest Bid to the Auction Owner*/
    function TransferEthToOwner(address Auctioneer , uint itemID) public payable isOwner() {
        itemID = itemID - 1;
        uint256 contract_balance = address(this).balance ;
        require(BidItems[Auctioneer][itemID].highest_bid <= contract_balance , 'Insufficient Amount in Contract');
        payable(AuctionOwner).transfer(BidItems[Auctioneer][itemID].highest_bid);
    }
   function GetBidItem(address _auctioneer) public view returns(Item[] memory){ // return all Items of an address
     return BidItems[_auctioneer];
    }
     
    function GetOwner() external view returns(address) { // return address of auction owner
        return AuctionOwner;
    }

    function GetRegistrationStatus(address _addr) external view returns(bool){ // return if address is registered
        return RegisteredAuctioneers[_addr];
    }

    function GetAddressesCount() public view isOwner returns(uint)
    {
        return RegisteredAuctioneersAddresses.length;
    }
    function GetAddresses()public view returns(address[] memory){
        return RegisteredAuctioneersAddresses;
    }
    function GetRegisteredAddresses(uint index) public view isOwner returns(address)
    {
        return RegisteredAuctioneersAddresses[index];
    }
    function ShowCurrentBid(address Auctioneer , uint itemID) external view  returns(address,uint){
        return (BidItems[Auctioneer][itemID-1].highest_Bidder,BidItems[Auctioneer][itemID-1].highest_bid);
    }

    function getCurrentHighestBid(address Auctioneer , uint itemID) external view returns(address,uint){
        return (BidItems[Auctioneer][itemID-1].highest_Bidder,BidItems[Auctioneer][itemID-1].highest_bid);
    }

    function getPrevHighestBid(address Auctioneer , uint itemID) external view returns(address,uint){
        return (BidItems[Auctioneer][itemID-1].prev_higest_bidder,BidItems[Auctioneer][itemID-1].prev_higest_bid);
    }
    function getContractBalance() external view returns(uint){
        return address(this).balance;
    }
}