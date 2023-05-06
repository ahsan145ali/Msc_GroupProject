const Auction = artifacts.require('Auction');

require('chai').use(require('chai-as-promised')).should()

contract('Auction',(accounts) =>{

    function Convert_wei(number){
        return web3.utils.toWei(number,'ether')
    }

    describe('Auction Contract Deployment' , async()=>{
        it('Matches Owner Successfully' , async()=>{
            let Auc = await Auction.new()
            const Owner = await Auc.GetOwner()
            assert.equal(Owner,accounts[0] , 'Owner Does not Match')
        })
    })

    describe('Registration User',async()=>{
        it("Checks if user is unregistered",async()=>{
            let Auc = await Auction.new()
            const RegStatus = await Auc.GetRegistrationStatus(accounts[0])
            assert.equal(RegStatus,false);
        })
    })

    describe('Registration User and Item',async()=>{
        it("Register User and check status",async()=>{
            let Auc = await Auction.new()
            await Auc.RegisterAsAuctioneer({from:accounts[0]});
            const RegStatus = await Auc.GetRegistrationStatus(accounts[0])
            assert.equal(RegStatus,true , 'User Not Registered Successfully');

            //Register Bid Item
            await Auc.RegisterBidItem("example",1,0 ,{from:accounts[0]})
            const Item = await Auc.GetBidItem(accounts[0])
            assert.equal(Item[0].itemID , 1 , 'Item Registration Failed')
 
        })
    })

    describe('Bidding',async()=>{
        it("Checks Bidding Functionality",async()=>{
            let Auc = await Auction.new()

            //Register Auctioneer
            await Auc.RegisterAsAuctioneer({from:accounts[0]});
            const RegStatus = await Auc.GetRegistrationStatus(accounts[0])
            assert.equal(RegStatus,true , 'User Not Registered Successfully');
            //Register Bid Item
            await Auc.RegisterBidItem("example",0,0 ,{from:accounts[0]})
            const Item = await Auc.GetBidItem(accounts[0])
            assert.equal(Item[0].itemID , 1 , 'Item Registration Failed')

            //place bif
            await Auc.Bid(2,Item[0].auctioneer_addr ,Item[0].itemID ,{from:accounts[1] , value:Convert_wei('5')})

            console.log(Item[0])
        })
    })
})