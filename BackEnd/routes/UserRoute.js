const express=require("express")
const router=express()
const usercontroller=require("../controllers/Usercontroller")

const TryCatchMiddleware=require("../middlewares/TryCatchMiddleware")
const userVerifytoken=require("../middlewares/UserAuthMiddleware")

router
.post("/register",TryCatchMiddleware(usercontroller.UserRegister)) 
.post("/login",TryCatchMiddleware(usercontroller.userlogin))
.post("/googleauthlogin",TryCatchMiddleware(usercontroller.googleAuthLogin))

.get("/products",TryCatchMiddleware(usercontroller.ViewProduct))
.get("/products/:id",TryCatchMiddleware(usercontroller.productById))
.get("/products/category/:categoryname",TryCatchMiddleware(usercontroller.productBycategory))
    
.use(userVerifytoken)             

.post("/:id/cart",TryCatchMiddleware(usercontroller.addToCart))
.get("/:id/cart",TryCatchMiddleware(usercontroller.ViewCart))
.put("/:id/cart",TryCatchMiddleware(usercontroller.updateCartItemQuantity))
.delete("/:id/cart/:itemId",TryCatchMiddleware(usercontroller.removeCartProduct))

.post("/:id/wishlists",TryCatchMiddleware(usercontroller.AddToWishlist))
.get("/:id/wishlists",TryCatchMiddleware(usercontroller.ViewWishlist))
.delete("/:id/wishlists",TryCatchMiddleware(usercontroller.deletewishlist)) 

.post("/:id/payment",TryCatchMiddleware(usercontroller.payment))
.get("/payment/success",TryCatchMiddleware(usercontroller.success))
.post("/payment/cancel",TryCatchMiddleware(usercontroller.Cancel)) 
.get("/:id/orders",TryCatchMiddleware(usercontroller.OrederDetails))  

    



module.exports=router

