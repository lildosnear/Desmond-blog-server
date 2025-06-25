const User = require("../models/auth.cjs")
const handleerror = require("../utils/handleerrors.cjs")


const register = async (req, res) => {
    // res.send("register")
    try {
        const user = await User.create(req.body)
        res.status(201).json({success: true, user})
    } catch (error) {
        // res.json({error})
        const errors = handleerror(error)
        res.status(400).json(errors);
    }
} 

const login = async(req, res) => {
    // res.send("login")
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({success: false, msg: "please provide necessary information"})
    }
    try {
    const userExists = await User.findOne({email});
    if(!userExists){
        // return res.status(400).json({success: false, msg: "Email has not been registered"})
        throw Error("incorrect email")
    }
    const authenticated = await userExists.comparePassword(password)
    if(!authenticated){
        // return res.status(400).json({success: false, msg: "Email or Password is incorrect"})
        throw Error("incorrect password")
    }
    const token = userExists.generateToken()
    res.status(200).json({
        success: true,
        user: {name: userExists.name, email: userExists.email},
        token
    })
} catch (error) {
    // res.json({error})
    const errors = handleerror(error)
    res.status(400).json(errors)

}
}



module.exports = {register, login}