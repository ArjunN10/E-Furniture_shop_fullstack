const jwt=require("jsonwebtoken")

module.exports = function verifyToken(req, res , next) {
    const token = req.headers[ "authorization"]    
    if(!token) {
        return res.status(403).json({erro:"Invalid token format"})
    }
    // console.log("env", process.env.ADMIN_ACCESS_TOKEN_SECRET)
    jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET, (err, decoded) => {

        if (err) {
            return res.status(401).json({error:"Unatherized"})
        }
        req.email = decoded.email
        
        
        next()
    })
}