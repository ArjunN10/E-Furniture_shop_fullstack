const jwt=require("jsonwebtoken")
const userdatabase=require("../models/UserSchema")
const { joiUserSchema}=require("../models/ValidationSchema")
const bcrypt=require("bcrypt")
const Products=require("../models/ProductSchema")
const UserSchema = require("../models/UserSchema")
const { ObjectId } = require('mongoose').Types;
const order=require("../models/OrderSchema")
const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY)

let sValue={}

module.exports={



//User Register

UserRegister: async (req, res) => {
    const { value, error } = joiUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: "Error",
            message: "Invalid user input data. Please check the data",
        });
    }

    try {
        const { name, email, username, password } = value;
        //    console.log("the data is",value);
        await userdatabase.create({
            name,
            username,
            email,
            password,
        });

        res.status(201).json({
            status: "success",
            message: "User registration successful",
        });
    } catch (err) {
        res.status(500).json({
            status: "Error",
            message: "Internal Server Error",
        });
    }
},



//User Login

userlogin:async(req,res)=>{
const {value,error}=joiUserSchema.validate(req.body)
// console.log(value)
if(error){
    return res.json(error.message)
}
const {email,password}=value
const user =await userdatabase.findOne({
    email:email,
})
const id=user.id
const Username=user.username
if(!user){
return res.status(404).json({
    status:"errror",
    message:"User not found"
})
}
if(!password || !user.password){
    return res.status(400).json({
        status:"error",
        message:"invalid input"
    })
}
const passwordmatch=await bcrypt.compare(password,user.password)
if(!passwordmatch){
    return res.status(401).json({
        status:"error",
        message:"incorrect password"
    })
}

const Token=jwt.sign({email:user.email},process.env.USER_ACCES_TOKEN_SECRET,{
    expiresIn:8500
})
res.status(200).json({
    status:"success",
    message:"Login Successfull",
    data:{id,email,Token,Username }
})
},


//Google Auth


googleAuthLogin:async(req,res)=>{
  const {email, displayName}=req.body 
  console.log(req.body)
try {
  const existUser=await userdatabase.findOne({email:email})
  if(existUser){
    const Token=jwt.sign({email:existUser.email},process.env.USER_ACCES_TOKEN_SECRET,
    { expiresIn:8500})
      res.status(201).json({
        status:"success",
        message:"Login success",
        data:Token,
        userid:existUser
      })
  }
  if(!existUser){
    const user=new UserSchema({username: displayName,email:email})
    await user.save()
    const Token=jwt.sign({email:existUser.email},process.env.USER_ACCES_TOKEN_SECRET,
      { expiresIn:8500})
  const ExistUser=await userdatabase.findOne({email:email})

    res.status(203).json({message:'user Loggined successfully', data:Token, 
    userid:ExistUser})
  }
} catch (error) {
  console.log(error) 
}
},



//view All product By categoury

ViewProduct:async(req,res)=>{
    const products=await Products.find()
    if(!products){
        return res.status(404).json({
            status:"error",
            message:"No products Found"
        })
    }
    return res.status(200).json({
        status:"success",
        message:"Products Fetched Successfully",
        data:products
    })
},


//View a specific product

productById:async(req,res)=>{
    const productId=req.params.id   
    const product=await Products.findById(productId)
    if(!product){
        res.status(404).json({
            status:"error",
            message:"product not found"
        })
    }
    res.status(200).json({
        status:"success",
        message:"product fetched successfully✅",
        data:product
    })

},


// view product Category

productBycategory:async(req,res)=>{
const productCategory=req.params.categoryname   
try {
       // Use a case-insensitive regular expression for the category search
       const products = await Products.find({
        category: { $regex: new RegExp(productCategory, 'i') },   
      });
  
      if (!products.length) {
        return res.status(404).json({   
          status: 'error',
          message: 'No products found in the specified category',
        });
    }
    res.status(200).json({
        status: 'success',
        message: 'Product Category Fetched ✅',
        data: products,
    });
} catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({  
      status: 'error',
      message: 'Internal Server Error',
    })
}
}, 

  
// Add to Cart

    addToCart:async (req, res) => {  
        const userId = req.params.id;  

        const user = await UserSchema.findById(userId);
        if (!user) {
        return res.status(404).json({
            status: "error", 
            message: "User Not Found",
        });
        } 
        const { productId } = req.body;


        // Check if productId is provided
        if (!productId) {
        return res.status(404).json({
            status: "error",
            message: "Product Not Found",
        });
        }
        if (!ObjectId.isValid(productId)) {
            return res.status(400).json({
                status: "error",
                message: "Invalid Product ID",
            });
        }
      //  check if product already in cart
        const isProductInCart = user.cart.some(item => item.productsId.equals(productId));

        if (isProductInCart) {
            return res.status(400).json({
                status: "error",
                message: "Product already in cart",
            });
        }
        const productObject = {
            productsId: new  ObjectId(productId),
            quantity: req.body.quantity,      
        }
        
        try {
        await UserSchema.updateOne({ _id: user._id }, { $addToSet: { cart:productObject } });
        res.status(200).json({
            status: "success",
            message: "Product Successfully Added To Cart",
        });
        } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
        }
    },



//add cart quantity

updateCartItemQuantity: async (req, res) => {
    const userID = req.params.id;   
    const { id, quantityChange } = req.body; 
  
    const user = await userdatabase.findById(userID);
    if (!user) { 
      return res.status(404).json({ message: 'User not found' }) 
    }
    const cartItem = user.cart.id(id)
    if (!cartItem) { 
      return res.status(404).json({ message: 'Cart item not found' }) 
    }
    cartItem.quantity += quantityChange
  
    if (cartItem.quantity > 0) {
      await user.save();
    }
    res.status(200).json({
      status: 'success',
      message: 'Cart item quantity updated',
      data: user.cart
    });
  },
  



//view product from cart

ViewCart: async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await userdatabase
      .findById(userId)
      .populate("cart.productsId");

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User Not Found",
      });
    }

    if (!user.cart || user.cart.length === 0) {
      return res.status(200).json({
        status: "Success",
        message: "User Cart is Empty",
        data: [],
      });
    }

    res.status(200).json({
      status: "success",
      message: "Cart Products Fetched Successfully",   
      data: user.cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
},

  



// Remove A cart

removeCartProduct:async(req,res)=>{
    const userId=req.params.id
    const itemId=req.params.itemId

    if(!itemId){
        return res.status(400).json({
            status:"error",
            message:"Product not found"
        })
    }
    const user= await userdatabase.findById(userId)
    if(!user){
        return res.status(400).json({
            status:"error",
            message:"User Not Found"
        })   
    }
    const result = await userdatabase.updateOne( 
        { _id: userId },
        { $pull: { cart: { productsId:itemId } } }
      );
      // console.log("dd",result)
       
    if (result.modifiedCount > 0) {
        console.log("Item removed successfully");
        res.status(200).json({message:"Product removed successfuly",data: result})
      } else {
        console.log("Item not found in the cart");
      }
},




//Add product to wishlist

AddToWishlist:async(req,res)=>{
    const userId=req.params.id
    // console.log(userId) 
    if(!userId){
        res.status(404).json({
            status:"error",
            message:"User Not Found"

        })
}
const {productId}=req.body
const produts=await Products.findById(productId)
if(!produts){
    return res.status(404).json({ 
    status: "Failure", 
    message: "Product not found" });
}
const findproduts=await userdatabase.findOne({_id:userId, wishlist:productId})
if (findproduts) {
    return res.status(409).json({ 
        status:"conflict",
        message: "Product already on your wishlist " 
    });
  }
  await userdatabase.updateOne({_id:userId},{$push:{wishlist:produts}})
    return res.status(201).json({
    status: "Success",
    message: "Product Succesfuly added to wishList",
  })
},


//show wishlist

ViewWishlist:async(req,res)=>{
    const userId=req.params.id
    const user=await userdatabase.findById(userId)
    if(!user){
        res.status(404).json({
            status:"error",
            message:"User Not Defined"
        })
    }
    const WishListPrdtId=user.wishlist
    // console.log("WishListPrdtId:",WishListPrdtId)
    if(WishListPrdtId.length === 0){
        return res.status(200).json({ 
            status: "Succes", 
            message: "User Wishlist is Emty", 
            data: [] });
    }
    const WishListproducts=await Products.find({_id:{$in:WishListPrdtId}})
    res.status(200).json({
      status: "Success",
      message: "Wishlist products fetched successfully",
      data: WishListproducts
})
},


//delete wishlist

deletewishlist:async(req,res)=>{
    const userId=req.params.id
    console.log(userId)
    const {productId}=req.body
    if (!productId) {
        return res.status(404).json({ 
            status:"error",
            message: "Product not Fount" 
        });
      } 
      const user=await userdatabase.findById(userId)
      if (!user) {
        return res.status(404).json({ 
            status: "Failear", 
            message: "User Not Found"
         });
      }
      await userdatabase.updateOne({_id:userId},{$pull:{wishlist:productId}})
      res.status(200).json({
        status:"success",
        message:"successfully removed from wishlist"
    })
},


//User payment 

    payment: async (req, res) => {
        const userId = req.params.id;
        // uid = userId  //  for parsing globel vareable
        console.log(userId);
        const user = await UserSchema.findOne({ _id: userId }).populate("cart.productsId")
    
        if (!user) {         
          return res.status(404).json({ message: "User Not found" });  
        }
    
        const cartProdcts = user.cart;  

        // console.log("cartitems",cartProdcts);


        if (cartProdcts.length === 0) {
          return res
            .status(200)
            .json({ status: "Succes", message: "User Cart is Empty", data: [] });
        }
    
        const lineItems = cartProdcts.map((item) => {
            // console.log("Item Price:", item.productsId.price);
          return {
            price_data: {
              currency: "inr",
              product_data: {
                        name: item.productsId.title,
                        description: item.productsId.description,
                            },
                                unit_amount: Math.round(item.productsId.price * 100),
                            },
                        quantity: 1,
                    };
                });
    // console.log(lineItems)               

        session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: lineItems,
          mode: "payment",
          success_url: `http://localhost:3000/payment/success`, // success URL
          cancel_url: "http://localhost:3000/payment/cancel",   // cancel URL
        });
    
        // console.log("Stripe Session:", session);
    
        if (!session) {
          return res.json({
            status: "Failure",
            message: " Error occured on  Session side",
          });
        }
        sValue = {
          userId,
          user,
          session,
        };
        // console.log(sValue)
    
        res.status(200).json({
          status: "Success",
          message: "Strip payment session created successfully",
          url: session.url,
        });
      },

//success (payment occured) 

success:async (req, res) => {
    const { id, user, session } = sValue
    // console.log( "svalues:-",sValue,"huhuh")
    const userId = user._id;
    const cartItems = user.cart;
    // console.log(userId)  
    // console.log(cartItems)

    const productitems= cartItems.map((item)=>item.productsId)
    // console.log("proo",productitems)

    const orders = await order.create({
      userId: id,
      products: productitems,
      order_id: session.id,
      payment_id: `demo ${Date.now()}`,
      total_amount: session.amount_total / 100,
    });
    if (!orders) {
      return res.json({ message: "error occured while inputing to orderDB" });
    }

    const orderId = orders._id;

    const userUpdate = await userdatabase.updateOne(  
      { _id: userId },
      {
        $push: { orders: orderId },
        $set: { cart: [] },
      },
      { new: true }
    );

    // console.log(userUpdate);
    if (userUpdate) {
      res.status(200).json({
        status: "Success",
        message: "Payment Successful.",
      });
    } else {
      res.status(500).json({
        status: "Error",
        message: "Failed to update user data.",
      });
    }
  },
        //Payment Cancel

        Cancel:async(req,res)=>{
            res.status(204).json({
                status:" No Content",
                message:"Payment canceled"
            })
        },

          //Order Details

        OrederDetails:async(req,res)=>{
        const userId=req.params.id
        const user = await UserSchema.findOne({ _id: userId }).populate("orders")
        // console.log("user",user)

        const orderedProducts=user.orders
        // console.log("orderPro:",orderedProducts)

        if (orderedProducts.length === 0) {
            return res.status(404).json({
                message: "You don't have any product orders.",
                data: [],
            });
        }

        const orderedItems= await order.find({_id:{$in:orderedProducts}}).populate("products")   
        // console.log(orderedItems)
     res.status(200).json({
    message: 'Ordered Products Details Found',
    data: orderedItems,
})
},            
        
}















