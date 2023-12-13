import React, { useContext, useEffect, useState } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
// import { Mycontext } from '../context/Context';
import { Axios } from '../App';
import toast from 'react-hot-toast';

function AdminUserList() {
  // const {user}=useContext(Mycontext)
  const [users,setusers]=useState([])

  
useEffect(()=>{
const FetchUsers= async()=>{
  try {
    const response=await Axios.get("/api/admin/users")
    console.log(response)
    if(response.status === 200){
      setusers(response.data.data)
    }
  } catch (error) {
    console.log("Error :",error)
    toast.error(error)
  }
}
FetchUsers();
},[])




  return (
    <div style={{width:'130vh',marginLeft:'70px',marginTop:'70px'}}>
        <MDBTable responsive className='caption-top '>
      <caption>Total Registered users:{users.length}</caption>
      <MDBTableHead>
        <tr>
          <th scope='col'>NO</th>
          <th scope='col'>ID</th>
          <th scope='col'>UserName</th>
          <th scope='col'>Email</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {users.map((data,index)=>
      
        <tr key={index}>
          <th scope='row'>{index+1}</th>
          <td>{data._id}</td>
          <td>{data.username}</td>
          <td>{data.email}</td>
        </tr>
        
        )}
       
        </MDBTableBody>
    </MDBTable>
    </div>
  )
}

export default AdminUserList