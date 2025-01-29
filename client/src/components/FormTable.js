import React from 'react'
import "../App.css"
import { MdClose } from "react-icons/md";
const FormTable = ({ handlesubmit, handleOnChange, handleclose, restData}) => {
  return (
    <div className="addContainer">
        <form onSubmit={handlesubmit}>
        <div className='close-btn'onClick={handleclose}><MdClose /></div>
        
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" onChange={handleOnChange} value={restData.name}/>

        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" onChange={handleOnChange} value={restData.email}/>

        <label htmlFor="mobile">Mobile:</label>
        <input type="number" id="mobile" name="mobile" onChange={handleOnChange} value={restData.mobile}/>

        <button>Submit</button>
        </form>
    </div>
  )
}
export default FormTable


