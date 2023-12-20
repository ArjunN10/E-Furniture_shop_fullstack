import React, { useEffect, useState } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody ,MDBBadge,MDBBtn} from 'mdb-react-ui-kit';
import { Mycontext } from '../context/Context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
// import { Axios } from '../App';
import axios from 'axios';


function AdminPageSofas() {
    const [products,setproducts]=useState([])
    console.log(products);
  //   const category='sofa'
  // const sofalist=products.filter((e)=>e.type.toLowerCase() === category)
  const categoryname="table"

    const navigate=useNavigate()
   

    useEffect(() => {
      const productBycategory=async()=>{
        try {
          const jwtToken = {
            headers: {
              Authorization: `${localStorage.getItem("Admin jwt")}`,
            },
          };
          // console.log(jwtToken)
          const response = await axios.get(`http://localhost:3003/api/admin/products/category/${categoryname}`,jwtToken)
          console.log(response)
          if(response.status === 200){
            setproducts(response.data.data) 
          
             console.log(response.data.data) 
          }
        } catch (error) {
          console.log("error :",error)
          toast.error(error)
        }
      }
      productBycategory()
      
          window.scrollTo(0, 0);
        }, []);



  return (
    <div>
       <MDBTable responsive className='caption-top'>
<caption>TOTAL PRODUCTS:{}</caption>
      <MDBTableHead>
        <tr>
          <th scope='col'>ID/</th>
          <th scope='col'>Products</th>
          <th scope='col'>Description</th>
          <th scope='col'>Availability</th>
          <th scope='col'>Type</th>
          <th scope='col'>Price</th>
          {/* <th scope='col'>Offer Price</th> */}
        </tr>
      </MDBTableHead>
      {products.map((item,index)=>
     
      <MDBTableBody>
        <tr>
          <td>{item._id}</td>
          <td>
            <div className='d-flex align-items-center'>
              <img
                src={item.image}
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              />
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{item.title}</p>
          
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>{item.description}</p>
    
          </td>
          <td>
            <MDBBadge color='success' pill>
              Available
            </MDBBadge>
          </td>
          <td>{item.category}</td>
          <td>{item.price}</td>
          {/* <td>{item.price2}</td> */}
          <td>
            <MDBBtn 
            color='link'
            rounded size='sm'
            onClick={()=>navigate('/adminedit')}>
              Edit
            </MDBBtn>
          </td>
          <td>
            <MDBBtn 
            color='danger'
            rounded size='sm'
            onClick={()=>setproducts(p=>p.filter((a,i)=>i!=index))}
            
            >
            Delete
            </MDBBtn>
          </td>
               </tr>
      </MDBTableBody>
       )}
    </MDBTable>
    </div>
  )
}

export default AdminPageSofas