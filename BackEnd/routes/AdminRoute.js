const express=require("express")
const router=express.Router()
const admincontroller=require("../controllers/Admincontroller")



//middleware
const TrycatchMiddleware = require("../middlewares/TryCatchMiddleware")
const verifyToken=require("../middlewares/AdminAuthMiddleware")
const imageUpload=require("../middlewares/imageuploader/ImageUploader")


// router.use(express.json())

router
.post("/login", TrycatchMiddleware(admincontroller.login))

// apk middleware start

.use(verifyToken)

// apk middleware end

.get("/users",TrycatchMiddleware(admincontroller.allusers))
.get("/users/:id",TrycatchMiddleware(admincontroller.UseById))
.post("/product",imageUpload,TrycatchMiddleware(admincontroller.addproduct))
.get("/products",TrycatchMiddleware(admincontroller.allproducts))
.get("/products/:id",TrycatchMiddleware(admincontroller.productById))
.delete("/products",TrycatchMiddleware(admincontroller.deleteProduct))
.patch("/products/:id",TrycatchMiddleware(admincontroller.UpdateProduct))  
.get("/orders",TrycatchMiddleware(admincontroller.AdminOrderDtails))  
.get("/status",TrycatchMiddleware(admincontroller.status))        
// .get("/datas/:discription",TrycatchMiddleware(admincontroller.viewBydisc))



 module.exports=router