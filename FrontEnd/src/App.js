
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import React, { useState } from 'react'
import Login from './LoginSignup/Login';
import Signup from './LoginSignup/Signup';
import { Mycontext } from './context/Context';
import Sofa from './components/products/Catogery/Sofa';
import Tables from './components/products/Catogery/Tables';
import Bed from './components/products/Catogery/Bed';
import Wardrobes from './components/products/Catogery/Wardrobes';
import Chairs from './components/products/Catogery/Chairs';
import Productview from './components/products/Catogery/Productview';
import Allproducts from './components/products/Catogery/Allproducts';
import Addcart from './components/products/Catogery/Addcart';
import Paymentpage from './components/products/Catogery/Paymentpage';
import Externalpage from './components/products/Catogery/Externalpage';
import AdminHome from './Admin/AdminHome';
import AdminAdd from './Admin/AdminAdd';
import AdminEdit from './Admin/AdminEdit';
import AdminAllproduct from './Admin/AdminAllproduct';
import AdminPageBeds from './Admin/AdminPageBeds';
import AdminPageSofas from './Admin/AdminPageSofas';
import AdminPageChairs from './Admin/AdminPageChairs';
import AdminPageWardrobes from './Admin/AdminPageWardrobes';
import AdminPageTables from './Admin/AdminPageTables';
import AdminUserList from './Admin/AdminUserList';
// import SuccessPayment from './components/products/Catogery/SuccessPayment';
import SuccessPayment from './components/products/Catogery/SuccessPayment';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';


export const Axios= axios.create({
  baseURL: process.env.REACT_BASE_URL || "http://localhost:3003/",
  headers: {
    "Content-Type":"application/json",
    Authorization:localStorage.getItem('jwt')
  }
})


function App() {
const [products,setproducts]=useState([])
const [user,setuser]=useState([])
const [username,setusername]=useState([])
const [addcart,setaddcart]=useState([])
const [loggedIn, setLoggedIn] = useState(false);

const [wishlist ,setWishlist] = useState([])
const [wishStatus, setWishStatus] = useState(false)
const userId=localStorage.getItem("UserId")


// add Wishlist

const AddToWishlist=async(productId)=>{
  try {
    await Axios.post(`/api/users/${userId}/wishlists`,{productId})
      const response = await Axios.get(`api/users/${userId}/wishlists`)
      if(response.status === 200){
        toast.success("Added to wishlist")
        setWishlist(response.data.data)

      }
  } catch (error) {
    toast.error(error)
    
  }
}





  return (
    <>
    <Mycontext.Provider value={{products,setproducts,user,setuser,username,setusername,addcart,setaddcart,loggedIn, setLoggedIn,AddToWishlist}}>

    <Toaster position="top-center" reverseOrder={false}/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>

      <Route path='/sofa' element={<Sofa/>}/>
      <Route path='/table' element={<Tables/>}/>
      <Route path='/bed' element={<Bed/>}/>
      <Route path='/wardrobe' element={<Wardrobes/>}/>
      <Route path='/chair' element={<Chairs/>}/>
      <Route path='/productview/:id' element={<Productview/>}/>
      <Route path='/allproducts' element={<Allproducts/>}/>
      <Route path='/addcart' element={<Addcart/>}/>
      <Route path='/bill' element={<Paymentpage/>}/>
      <Route path="/payment/success" element={<SuccessPayment/>}/>
      <Route path='/*' element={<Externalpage/>}/>

  <Route path="/adminhome/" element={<AdminHome />}>
  <Route path="adminAllproduct" element={<AdminAllproduct />} />
  <Route path="adminAdd" element={<AdminAdd />} />
  <Route path="adminedit/:id" element={<AdminEdit />} />
  <Route path="adminUserlist" element={<AdminUserList/>} />
  <Route path="AdminPageBeds" element={<AdminPageBeds/>} />
  <Route path="AdminPageSofas" element={<AdminPageSofas/>} />
  <Route path="AdminPageChairs" element={<AdminPageChairs/>} />
  <Route path="AdminPageWardrobes" element={<AdminPageWardrobes/>} />
  <Route path="AdminPageTables" element={<AdminPageTables/>} />
   </Route>

     </Routes>
     </Mycontext.Provider>
     

    </>
  );
}

export default App;
