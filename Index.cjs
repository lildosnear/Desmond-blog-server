require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 1500
const mongoose = require("mongoose")
const authRouter = require("./routes/authRouter.cjs")
const auth = require("./middleware/authentication.cjs")
const blogRouter = require("./routes/blogRouter.cjs")
const notfound = require("./utils/notfound.cjs")

app.use(express.json())
app.use("/api/v1", authRouter)

// app.get("/test", auth,(req, res)=>{
//     res.send("passed authentication")
// })
app.use("/api/v1/blog", auth, blogRouter)
app.use(notfound)
const start = async() =>{
    try {
        await mongoose.connect(process.env.dbURL)
        app.listen(PORT,()=>{
            console.log(`server is running on port ${PORT}`);
            
        })
    } catch (error) {
        console.log(error);
        
    }
} 

start()