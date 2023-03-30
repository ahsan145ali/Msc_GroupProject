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

    describe('Registration',async()=>{
        it("Checks if user is unregistered",async()=>{
            let Auc = await Auction.new()
            const RegStatus = await Auc.GetRegistrationStatus(accounts[0])
            assert.equal(RegStatus,false);
        })
    })

    describe('Registration',async()=>{
        it("Register User and check status",async()=>{
            let Auc = await Auction.new()
            await Auc.RegisterAsAuctioneer({from:accounts[0]});
            const RegStatus = await Auc.GetRegistrationStatus(accounts[0])
            assert.equal(RegStatus,true , 'User Not Registered Successfully');
        })
    })

    describe('Bidding',async()=>{
        it("Checks Bidding Functionality",async()=>{
            
        })
    })
})