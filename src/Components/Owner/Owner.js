import React from 'react'
import {useNavigate} from 'react-router-dom';
const Owner = () => {
    const navigate = useNavigate();
    const handleMainClick = ()=>
    {
        navigate("/");
    }
  return (
    <div>
      <button onClick={handleMainClick}>Main</button>
      <h1>Owner</h1>
    </div>
  )
}

export default Owner
