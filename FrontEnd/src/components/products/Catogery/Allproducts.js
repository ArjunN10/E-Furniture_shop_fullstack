import React, { useContext, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBCardImage, MDBBtn, MDBRipple, MDBIcon } from 'mdb-react-ui-kit';
import { Mycontext } from '../../../context/Context';
import { useNavigate } from 'react-router-dom';
import Nav from '../../Nav';
import Footer from '../../Footer';
import { Axios } from '../../../App';
import toast from 'react-hot-toast';
import axios from 'axios';

function Allproducts() {
  const { products,setproducts,AddToWishlist } = useContext(Mycontext);
  const navigate = useNavigate();
  const IsUser=localStorage.getItem("UserId")
// console.log(IsUser)

  useEffect(() => {
const productsfetch=async()=>{
  try {
    const response=await axios.get("http://localhost:3003/api/users/products")
    if(response.status === 200){
      setproducts(response.data.data)
      // console.log("products:",response.data.data)
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message || "Failed to fetch products")
  }
}
productsfetch();

    window.scrollTo(0, 0);
  }, []);


  const handleViewProduct = (productId) => {
    if (IsUser) {
      navigate(`/productview/${productId}`);
     } else {
       toast.error("Please Log in");
     }
  };

  return (
    <>
      <div className='sticky-top'>
        <Nav />
      </div>
      <div className='container mt-2'>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3'>
        {Array.isArray(products) && products.length > 0 ? (     //check for array and not empty befor mapping
          products.map((items) => (
            <div key={items._id} className='col mb-4'>
              <MDBCard className='h-100'>
              <MDBIcon style={{marginLeft:10,marginTop:5,fontSize:25,}} far icon="heart"        //Wishlist icon
                  onClick={() => 
                    IsUser ? AddToWishlist(items._id): toast.error("Pleas login")
                  } />
                <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                  <MDBCardImage src={items.image} fluid alt='Photo' />
                </MDBRipple>
                <MDBCardBody>
                  <MDBCardTitle>{items.title}</MDBCardTitle>
                  <MDBCardText>{items.description}</MDBCardText>
                </MDBCardBody>
                <MDBCardFooter className='my-auto mx-auto'>
                  <MDBBtn onClick={() => handleViewProduct(items._id)}>View Product</MDBBtn>
                </MDBCardFooter>
              </MDBCard>
            </div>
          ))
        ):(
          <p>No products available</p>
        )
        }
        </div>
      </div>
      <div className='mt-3'>
        <Footer />
      </div>
    </>
  );
}

export default Allproducts;
