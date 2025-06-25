const router = require("express").Router()
const {register, login} = require ("../Controllers/auth.cjs")

router.post("/register", register)
router.post("/login", login)

module.exports = router