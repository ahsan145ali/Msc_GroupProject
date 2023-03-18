import React from 'react'
import "./Table.css"
const Table = (props) => {
  return (
    <div>
      <>
                <div className="Main-Table-container">
                    <table className="Table">
                        <thead className="Table-Header">    
                            <tr className='row-head'>
                                <th>#</th>
                                <th>Bidder</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody className="Table-Body">
                            <tr className="row1">
                                <td>Highest Bid</td>
                                <td>{props.highestBidder}</td>
                                <td>{props.highestBid} eth</td>
                            </tr>

                            <tr className="row2">
                                <td>Prev Highest Bid</td>
                                <td>{props.prevHigestBidder}</td>
                                <td>{props.prevHigestBid} eth</td>
                            </tr>
                            
                        </tbody>
                        
                    </table>
                    
                </div>
            </>
    </div>
  )
}

export default Table
