const Auction = artifacts.require('Auction');

require('chai').use(require('chai-as-promised')).should()

contract('Auction',(accounts) =>{

    describe('Auction Contract Deployment' , async()=>{
        it('Matches Owner Successfully' , async()=>{
            let Auc = await Auction.new()
            const Owner = await Auc.GetOwner()
            assert.equal(Owner,accounts[0])
        })
    })
})