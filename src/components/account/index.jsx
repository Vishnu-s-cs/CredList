import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import label from "../../Languages/"
import Swal from 'sweetalert2'
function Account() {
    const {balance,history} = useSelector(state=>state)
    const dispatch = useDispatch()
  
  const [isSubmitted, setIsSubmitted] = useState("");
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if(isSubmitted <0){
        Swal.fire({  
          title: 'value must be a positive integer',
          icon: 'error'
        });
      }else{
          dispatch({type:'ADD',payload:Number(isSubmitted)})
      
          setIsSubmitted("");
      }
    
    };
    return (
        <div className="main">
        <h2>{label("ACCOUNT")}</h2>
        <p>{label("COUNT")} {history.length}</p>
        <h5>{label("BALANCE")} : {balance}</h5>
        <form onSubmit={handleSubmit}>
        {label("BALANCE")}  <input
            type="number"
            name="balance"
            onChange={(e) => setIsSubmitted(e.target.value)}
            value={isSubmitted}
          />
          <br />
          <button type="submit">{label("SUBMIT")}</button>
        </form>
        <ul >
          <h3>{label("BALANCE_HISTORY")}</h3>
          {history.map((balance, i) => {
       return <li key={i} className="second">
            <h4>{label("BALANCE")} {balance}</h4>
        </li>
          })}
        </ul>
        
      </div>
    )
}

export default Account;