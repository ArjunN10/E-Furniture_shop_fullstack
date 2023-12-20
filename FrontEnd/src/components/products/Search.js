import React, { useContext, useEffect, useState } from "react";

import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBInput,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../App";
import toast from "react-hot-toast";

const Search = () => {
  const [products,setproducts]=useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const productsfetch=async()=>{
      try {
        const response=await Axios.get("/api/users/products")
        // console.log(response)
        if(response.status === 200){
          setproducts(response.data.data)
        }
      } catch (error) {
        // console.log(error)
        // toast.error(error.message || "Failed to fetch products for search")
      }
    }
    productsfetch();
    
    window.scrollTo(0, 0);
      }, [setSearchQuery]);
    

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredProducts = products.filter((item) =>
  item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <MDBDropdown>
        <MDBDropdownToggle className="shadow-none bg-transparent border-0 overflow-hidden">
          <form className="d-flex">
            <MDBInput
              type="search "
              placeholder="Search Here"
              className="me-2 my-2"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <MDBBtn outline color="success"  className="my-1 my-1">
              <MDBIcon icon="search"/>
            </MDBBtn>
          </form>
        </MDBDropdownToggle>
        <MDBDropdownMenu end className="overflow-hidden">
          {filteredProducts.map((item) => (
            <MDBDropdownItem
            key={item._id}
            onClick={() => navigate(`/productview/${item._id}`)}
            >
              <img src={item.image} className="w-25" alt={item.title} />{" "}
              {item.title}
            </MDBDropdownItem>
          )).splice(0,6)}
        </MDBDropdownMenu>
      </MDBDropdown>
    </div>
  );
};

export default Search;
