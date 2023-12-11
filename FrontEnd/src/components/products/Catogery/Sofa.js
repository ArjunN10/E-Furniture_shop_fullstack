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

function Sofa() {
  const navigate = useNavigate();
  const { products,setproducts  } = useContext(Mycontext);
  // const FilterProduct = products.filter((e) => e.type.toLowerCase() === 'sofa');
  const categoryname="sofa"

  useEffect(() => {
const productBycategory=async()=>{
  try {
    const response = await Axios.get(`/api/users/products/category/${categoryname}`)
    console.log(response)
    if(response.status === 200){
      setproducts(response.data.data)
    
      // console.log(response.data.data) 
    }
  } catch (error) {
    console.log("error :",error)
    toast.error(error.message)
  }
}
productBycategory()

    window.scrollTo(0, 0);
  }, [categoryname, setproducts, Axios]);

  return (
    <>
      <div className='sticky-top'>
        <Nav />
      </div>
      <MDBContainer className='container py-5'>
        <MDBRow className='row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4'>
        {Array.isArray(products) && products.length > 0 ? (     //check for array and not empty befor mapping
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
            <p>No products available in this category</p>
            )}
        </MDBRow>
      </MDBContainer>
      <div className='mt-3'>
        <Footer />
      </div>
    </>
  );
}
export default Sofa;
