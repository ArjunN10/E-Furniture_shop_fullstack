import React from 'react';
import Nav from '../../Nav';
import { useContext, useEffect } from 'react';
import { Mycontext } from '../../../context/Context';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBContainer,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Footer';
import { Axios } from '../../../App';
import toast from 'react-hot-toast';
import axios from 'axios';

function Chairs() {
  const navigate = useNavigate();
  const { products,setproducts } = useContext(Mycontext);
  // const FilterProduct = products.filter((e) => e.type.toLowerCase() === 'chair');
  const categoryname="Chair"

  useEffect(() => {
    const productBycategory=async()=>{
      try {
        const response=await axios.get(`http://localhost:3003/api/users//products/category/${categoryname}`)
        if(response.status === 200){
          setproducts(response.data.data)
        }
      } catch (error) {
        console.log("Error fetching product Category",error)
        toast.error(error)
      }  
    }
productBycategory()

    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className='sticky-top'>
        <Nav />
      </div>
      <MDBContainer className='container py-5'>
        <MDBRow className='row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4'>
          {Array.isArray(products) && products.length > 0?(
          products.map((productsList) => (
            <MDBCol key={productsList._id} className='mb-4'>
              <MDBCard onClick={() => navigate(`/productview/${productsList._id}`)}>
                <MDBCardImage
                  src={productsList.image}
                  alt='Photo'
                  className='card-img-top'
                />
                <MDBCardBody>
                  <MDBCardTitle>{productsList.title}</MDBCardTitle>
                  <MDBCardText className='card-text'>{productsList.price}</MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))):(
            <p>This product category is not available</p>
          )}
        </MDBRow>
      </MDBContainer>
      <div className='mt-3'>
        <Footer />
      </div>
    </>
  );
}
export default Chairs;
