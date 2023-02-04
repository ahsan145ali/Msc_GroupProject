// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Auction
{
    address AuctionOwner; // address of auction owner
    mapping(address=>uint) bidders; // address of biders which map to the amount of bid placed
    mapping(address=>uint) Pending_returns; // address of all bidders that were outbidded and are eligible for a return amount
   
    constructor()
    {
        AuctionOwner = msg.sender;
    }

    function GetOwner() external view returns(address)
    {
        return AuctionOwner;
    }

}