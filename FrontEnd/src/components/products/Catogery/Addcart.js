import React, { useContext, useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import { Mycontext } from "../../../context/Context";
import Counter from "../Counter";
import Footer from "../../Footer";
import { Axios } from "../../../App";
import toast from "react-hot-toast";

function Addcart() {
  const [addcart, setaddcart ] = useState([])
  const navigate = useNavigate();

  const handleBackToShopping = () => {
    navigate("/");
  };

const {id}=useParams()

const userid=localStorage.getItem("UserId")
const FetchCartproducts=async()=>{
  try {
    const response=await Axios.get(`/api/users/${userid}/cart`)
    if(response.status === 200){
      setaddcart(response.data.data.cart)
    }
  } catch (error) {
    console.log(error)
    toast.error(error)      
  }
}
useEffect(()=>{
  FetchCartproducts() 
},[])



// Handle Product Quantity

const handleQuantity=async(cartId,quantityChange)=>{
  const data={id:cartId,quantityChange}
  try {
    await Axios.put(`/api/users/${id}/cart`,data)
    const response=await Axios.get(`/api/users/${userid}/cart`)
    if(response.status === 200){
      return FetchCartproducts()
    }
  } catch (error) {
    toast.error(error) 
  }
}


// Handle Product Remove
const handleRemoveItem=async(ItemId)=>{
  try {
    const response=await Axios.delete(`/api/users/${id}/cart/${ItemId}`)
    if (response.status === 200) {
      toast.success(response.data.message)
      return FetchCartproducts()
    }
  } catch (error) {
    console.error(error);
    toast.error('Error removing product from the cart');
  }
}


//Handle Checkout

const handleCheckout=async()=>{
  try {
    const response=await Axios.post(`/api/users/${userid}/payment`)
    if(response.status === 200){
     const url=response.data.url
     const conformation=window.confirm("Payment session created. Redirecting to the payment gateway. Continue?")
      if(conformation)window.location.replace(url)
    }
  } catch (error) {
    toast.error(error.response.data.message)
  }
}



  return (
    <section className="h-auto h-custom" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center align-items-center">
          <MDBCol lg="7">
            <MDBCard className="shopping-cart" style={{ borderRadius: "15px" }}>
              <MDBCardBody className="text-black">
                <MDBTypography
                  tag="h3"
                  className="mb-4 text-center fw-bold text-uppercase text-decoration-underline"
                >
                  Cart products
                </MDBTypography>
                { addcart.map((item) => (
                  <div className="d-flex align-items-center mb-4" key={item.productsId._id}>
                    <div className="flex-shrink-0">
                      <MDBCardImage
                        src={item.productsId.image}
                        fluid
                        style={{ maxWidth: "150px" }}
                        alt={item.productsId.title}
                      />
                    </div>

                    <div className="flex-grow-1 ms-3">
                      <a
                        href="#!"
                        className="float-end text-black"
                        onClick={() =>  handleRemoveItem(item._id)}
                      >
                        <MDBIcon fas icon="times" />
                      </a>
                      <MDBTypography tag="h5" className="text-primary">
                        {item.productsId.title}
                      </MDBTypography>
                      <div className="d-flex align-items-center">
                        <p className="fw-bold mb-0 me-4">Price: ${item.productsId.price}</p>
                        <MDBBtn
                                style={{ border: "1px" }}
                                className="minus mx-3 "
                                onClick={() => handleQuantity(item.productsId._id, -1)}
                              >
                                <MDBIcon fas icon="minus" />
                              </MDBBtn>
                             <span className="me-4">{item.quantity}</span>
                              <MDBBtn
                                className="plus"
                                style={{ border: "1px" }}
                               onClick={() => handleQuantity(item.productsId._id, 1)}
                              >
                            <MDBIcon fas icon="plus" />
                          </MDBBtn>
                      </div>
                    </div>
                  </div>
                ))}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="5">
            <form className="mb-4">
              <MDBTypography tag="h5" className="fw-bold mb-4">
                <p className="text-center fw-bold text-uppercase">GRAND TOTAL: ${}</p>
              </MDBTypography>
              <MDBBtn
                onClick={() => handleCheckout()}
                className="mb-3"
                block
                size="lg"
              >
                Buy now
              </MDBBtn>
              <a href="#!" onClick={handleBackToShopping}>
                <MDBIcon fas icon="angle-left me-2" />
                Back to shopping
              </a>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="mt-3">
        <Footer />
      </div>
    </section>
  );
}

export default Addcart;
