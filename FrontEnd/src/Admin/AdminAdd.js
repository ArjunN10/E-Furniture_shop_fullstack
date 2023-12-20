import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mycontext } from '../context/Context'
import toast from 'react-hot-toast'
// import { Axios } from '../App'
import axios from 'axios'


function AdminAdd() {


const {products,setproducts}=useContext(Mycontext)
const navigate=useNavigate()


const [title, settitle] = useState("");
const [image, setImage] = useState(null);
const [category, setCategory] = useState("");
const [price, setPrice] = useState("");
const [description, setDescription] = useState("");


const handleImageChanges = (item) => {
  const selectedImage = item.target.files[0];
  setImage(selectedImage);

  // If you need to perform any action immediately after setting the image, you can do it here.
  // For example, you might want to log the file details:
  // console.log("Selected Image:", selectedImage);
};


const handleSubmit = async (item) => {
  item.preventDefault();

  if (!title || !image || !category || !price || !description) {
    toast.error("Please fill in all fields");
    return;
  }

  const formData = new FormData();

  formData.append("title", title);
  formData.append("image", image);
  formData.append("category", category);
  formData.append("price", price);
  formData.append("description", description);

  // console.log(formData); 

  try {
    const jwtToken = {
      headers: {
        Authorization: `${localStorage.getItem("Admin jwt")}`,
      },
    };

    const response = await axios.post("http://localhost:3003/api/admin/products", formData, jwtToken);
    if (response.status === 201) {
      toast.success("Product added successfully!");
      navigate("/adminhome/adminAllproduct");
    } else {

      toast.error("Failed to add product.");
    }
  } catch (error) {
    console.error("Error uploading product:", error.message);
    toast.error("Failed to add product.");
  }
};


const handleCategoryChange = (event) => {
  setCategory(event.target.value);
};


  return (
    <>
   <div className="container" >
      <h1>Add Product</h1>
      <form
      //  onSubmit={handleSubmit}
       >  
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" className="form-control" id="name" onChange={(e)=>settitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="src" className="form-label">Image:</label>
          <input
                  type="file"
                  accept="image/*"
                  name="image"
                  className="form-control"
                  onChange={handleImageChanges}
                  placeholder="img-1" 
                />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Type:</label>
          <select  id="type" onChange={handleCategoryChange}>
                <option value="">select</option>
                <option value="table">Table</option>
                <option value="chair">Chair</option>
                <option value="sofa">Sofa</option>
                <option value="bed">Bed</option>
                <option value="wardrobe">wardrobe</option>
         </select>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input type="text" className="form-control" id="price" onChange={(e)=>setPrice(e.target.value)}   required />
        </div>
        <div className="mb-3">
          <label htmlFor="price2" className="form-label">Offer Price:</label>
          <input type="text" className="form-control" id="offer"  />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea className="form-control" id="description" onChange={(e)=>setDescription(e.target.value)}  required />
        </div>
        <button  className="btn btn-primary"  onClick={handleSubmit}>Add Product</button>
        <br/>
        <br/>
        <button  className="btn btn-success"  onChange={()=>navigate('/adminhome/adminAllproduct')} >Back To All Product</button>
      </form>
    </div>
    </>
  )
}

export default AdminAdd