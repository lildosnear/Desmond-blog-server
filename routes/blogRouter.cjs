const router = require("express").Router()
const {createBlog, getBlog, getSingleBlog, updateBlog, deleteBlog} = require("../Controllers/blog.cjs")

router.route("/").post(createBlog).get(getBlog)
router.route("/:blogId").patch(updateBlog).get(getSingleBlog).delete(deleteBlog)


module.exports = router