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
    constructor()
    {
        AuctionOwner = msg.sender;
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
}