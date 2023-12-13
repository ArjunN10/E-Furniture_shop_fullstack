import React, { useContext, useEffect, useState } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
// import { Mycontext } from '../context/Context';
import { Axios } from '../App';
import toast from 'react-hot-toast';

function AdminUserList() {
  // const {user}=useContext(Mycontext)
  const [users,setusers]=useState([])

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const jwtToken = {
          headers: {
            Authorization: `${localStorage.getItem("Admin jwt")}`,
          },
        };
        const response=await Axios.get("/api/admin/users",jwtToken)
        // console.log(response)
        if (response.status === 200) {
          setusers(response.data.data || []); 
        }
      } catch (error) {
        console.log("Error:", error);
        toast.error("Failed to fetch users");
      }
    };
  
    fetchUsers();
  }, []);
  



  return (
    <div style={{width:'130vh',marginLeft:'70px',marginTop:'70px'}}>
        <MDBTable responsive className='caption-top ' style={{background:"#1b9049c2"}}>
      <caption><b>Total Registered users:{users.length}</b></caption>
      <MDBTableHead>
        <tr>
          <th scope='col'><b>NO</b></th>
          <th scope='col'><b>ID</b></th>
          <th scope='col'><b>UserName</b></th>
          <th scope='col'><b>Email</b></th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
   {users.map((data,index) => (
  <tr key={data._id}>
    <th scope='row'>{index+1}</th>
    <th scope='row'>{data._id}</th>
    <td>{data.username}</td>
    <td>{data.email}</td>
  </tr>
))}
       
        </MDBTableBody>
    </MDBTable>
    </div>
  )
}

export default AdminUserList