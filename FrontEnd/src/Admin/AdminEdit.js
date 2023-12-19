import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBListGroupItem,
  MDBCardHeader,
  MDBListGroup,
} from "mdb-react-ui-kit";
import { Axios } from "../App";
import toast from "react-hot-toast";

function AdminEdit() {
  const { id } = useParams();
  const [productdata, setProductData] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const jwtToken = {
          headers: {
            Authorization: `${localStorage.getItem("Admin jwt")}`,
          },
        };
        const response = await Axios.get(`/api/admin/products/${id}`, jwtToken);
        if (response.status === 200) {
          const { _id, title, category, price, description, image } =
            response.data.data;
          setProductData({
            id: _id,
            title,
            category,
            price,
            description,
            image,
          });
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const jwtToken = {
        headers: {
          Authorization: `${localStorage.getItem("Admin jwt")}`,
        },
      };
      const response = await Axios.patch(
        `/api/admin/products`,
        productdata,
        jwtToken
      );
      if (response.status === 200) {
        toast.success("Product Edited Successfully");
      }
    } catch (error) {
      console.error("Error editing product:", error);
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <MDBContainer
        fluid
        className="p-4 background-radial-gradient overflow-hidden"
      >
        <MDBRow>
          <MDBCol md="6" className="position-relative">
            <div>
              <div className="container">
                <h1>Edit Product</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      onChange={handleChange}
                      value={productdata.title}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Image:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="image"
                      name="image"
                      onChange={handleChange}
                      value={productdata.image}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      Category:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      name="category"
                      onChange={handleChange}
                      value={productdata.category}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Price:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="price"
                      name="price"
                      onChange={handleChange}
                      value={productdata.price}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Description:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      onChange={handleChange}
                      value={productdata.description}
                    />
                  </div>
                  <button className="btn btn-primary">Edit</button>
                  <br />
                  <br />
                </form>
              </div>
            </div>
          </MDBCol>
          <MDBCol className="ms-5">
            <MDBCard
              style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}
            >
              <MDBCardHeader className="mx-auto rounded text-primary">
                DETAILS
              </MDBCardHeader>
              <MDBListGroup flush>
                {Object.keys(productdata).map((key) => (
                  <MDBListGroupItem key={key}>
                    <label className="bg-secondary rounded px-3 text-white">
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </label>
                    {productdata[key]}
                  </MDBListGroupItem>
                ))}
              </MDBListGroup>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default AdminEdit;
