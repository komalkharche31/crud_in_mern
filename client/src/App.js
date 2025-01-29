import './App.css';

import { useEffect, useState } from 'react';
import FormTable from './components/FormTable';
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8080/"

function App() {
  const [addSection, setAddSection] = useState(false);
   //for sending /creating data
   const [formData, setFormData] = useState({
    name:"",
    email:"",
    mobile:"",
    id:""
  })

  const [editSection, setEditSection] = useState(false)
  const [formDataEdit, setFormDataEdit] = useState({
    name:"",
    email:"",
    mobile:"",
    id:""
  })


  const [datalist, setDatalist] = useState([])
  const getfectchData = async()=>{
    const data = await axios.get('/')
    //console.log(data);
    if(data.data.success){
      setDatalist(data.data.data)
    }
  }

  useEffect(()=>{
    getfectchData();
  },[])  //[] is mandatory otherwise multiple request send infite time

  //Add time on change data handle here
  const handleOnChange = (e)=>{
    const {value, name} = e.target;
    setFormData((previous)=>{
      return{
        ...previous,
        [name] : value  //name is input field name like email, mobile name etc
      }
    })
  }
  const handleDelete = async(id)=>{
    const data = await axios.delete("/delete/"+id)
    if(data.data.success){
      getfectchData();
      alert(data.data.message)
    }
    
  }
  //console.log(datalist); add user record
  const handlesubmit = async(e)=>{
    e.preventDefault();
    const data = await axios.post("/create",formData)
    //console.log(data);
    if(data.data.success){
      setAddSection(false) //registartion form is hide
      alert(data.data.message);
      getfectchData()
    }
  }

  //edit update record action here
  const handleupdate = async(e)=>{
    e.preventDefault();
    const data = await axios.put("/update",formDataEdit)
    //console.log(data);
    if(data.data.success){
      setAddSection(false) //registartion form is hide
      alert(data.data.message);
      getfectchData()
      setEditSection(false)
    }
  }

  const handleEditOnChange = ((e)=>{
    const {value, name} = e.target;
    setFormDataEdit((previous)=>{
      return{
        ...previous,
        [name] : value  //name is input field name like email, mobile name etc
      }
    })
  })

  const handleEdit = (el)=>{
    setFormDataEdit(el);
    setEditSection(true)
  }
  return (
    <>
    <div className="container">
    <button className="btn btn-add" onClick={()=>setAddSection(true)}>Add</button>
      {
        addSection && (         
          <FormTable
            handlesubmit = {handlesubmit} 
            handleOnChange= {handleOnChange}
            handleclose = {()=>setAddSection(false)}
            restData= {formData}
          />
        )       
      }
      {
         editSection && (         
          <FormTable
            handlesubmit = {handleupdate} 
            handleOnChange= {handleEditOnChange}
            handleclose = {()=>setEditSection(false)}
            restData= {formDataEdit}
          />
        )
      }

      <div className='tableContainer'>
        <table>
            <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th></th>
                </tr>
            </thead>
            <tbody>
              {
                datalist[0]?(
                  datalist.map((el)=>{
                    return (
                      <tr>
                        <th>{el.name}</th>
                        <th>{el.email}</th>
                        <th>{el.mobile}</th>
                        <th>
                          <button className='btn btn-edit' onClick={()=>handleEdit(el)}>Edit</button>
                          <button className='btn btn-delete' onClick={()=>handleDelete(el._id)}>Delete</button>
                        </th>                      
                      </tr>
                    )
                  })
                ):(
                  <tr>
                    <th colspan="4" style={{textAlign:"center", padding:"10px"}}>No Data</th>
                  </tr> 
                )
              }              
            </tbody>
        </table>
      </div>

     </div>
    </>
  );
}

export default App;
