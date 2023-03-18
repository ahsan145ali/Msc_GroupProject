import React from 'react'
import "./Table.css"
const Table = () => {
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
                                <td>{0}</td>
                                <td>{0} eth</td>
                            </tr>

                            <tr className="row2">
                                <td>Prev Highest Bid</td>
                                <td>{0}</td>
                                <td>{0} eth</td>
                            </tr>
                            
                        </tbody>
                        
                    </table>
                    
                </div>
            </>
    </div>
  )
}

export default Table
