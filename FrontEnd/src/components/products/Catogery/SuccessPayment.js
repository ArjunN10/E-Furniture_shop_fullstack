import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Axios } from "../../../App";

 function SuccessPayment() {
  const navigate=useNavigate()
   const [payment, setPayment] = useState([])

   useEffect(() => { 
    let isSuccess = true
      const fetchData = async () => {
         try {
            const response = await Axios.get(`/api/users/payment/success`);
            if(response.status === 200 && isSuccess)
            toast.success("Payment successful");
        navigate("/");
        
         } catch (error) {
            toast.error(error.response.data.message);
            // navigate("/");
         }
      };
      const timeoutId = setTimeout(fetchData, 3000);

      return () => {
        isSuccess = false
        clearTimeout(timeoutId)
      }

     
   }, []);

   return (
      <div className="payment-success d-flex justify-content-md-center">
         <img
            src="https://cdn.dribbble.com/users/253392/screenshots/6906291/check.gif"
            alt="Success"
         />
      </div>
   );
}
export default SuccessPayment