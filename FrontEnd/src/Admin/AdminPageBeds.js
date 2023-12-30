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
  const categoryname="bed"

    const navigate=useNavigate()
   


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


    useEffect(() => {
     
      productBycategory()
      
          window.scrollTo(0, 0);
        }, []);

        
        const handleRemove = async (productId) => {
          try {
            const jwtToken = {
              headers: {
                Authorization: `${localStorage.getItem("Admin jwt")}`,
              },
            };
            
            const response = await axios.delete(`http://localhost:3003/api/admin/products`,{...jwtToken,data:{ productId }})
            // console.log(response)
            if (response.status === 200) {
              setproducts(response.data.data);
              toast.success("Product deleted successfully!");
             productBycategory()
              
            }
          } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("Failed to delete product.");
          }
        };



  return (
    <>
    <div >
<MDBTable responsive className='caption-top '>
<caption className='ps-5 pt-5'><h4>
TOTAL PRODUCTS: {products?.length || 0}
  </h4></caption>
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
     
      <MDBTableBody>
      {products &&products.map((item)=>
        <tr key={item._id}>
          <td>{item._id}</td>
          <td>
            <div className='d-flex align-items-center'>
              <img
                src={item.image}
                alt='Photos'
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
            onClick={()=>navigate(`/adminhome/adminedit/${item._id}`)}>
              Edit
            </MDBBtn>
          </td>
          <td>
            <MDBBtn 
            color='danger'
            rounded size='sm'
            // onClick={()=>setproducts(p=>p.filter((a,i)=>i!=index))}
            onClick={() => handleRemove(item._id)}            >
            Delete
            </MDBBtn>
          </td>
        </tr>
      
      )}
       </MDBTableBody>
    </MDBTable>
    </div>
    </>
  )
}

export default AdminPageSofas