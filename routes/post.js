const router = require("express").Router();
const {
  getPosts,
  deletePost,
  editPost,
  createPost,
  uploadSingle,
  updateAll,
  setSocietyId,
} = require("../controllers/post.controller");

//?Get Request to display all the Posts
router.route("/:limit:skip").get(getPosts);

//?Post request to add a new post
router.route("/create").post(uploadSingle, createPost);

//?Post request to edit a post
router.route("/edit/:id").put(editPost);

// //?Update one post with new field
// router.route("/update/:id").put(setSocietyId);

// //?Update All the posts to add some additional fields
// router.route("/updatePosts").post(updateAll);

//?Delete Request to delete a post
router.route("/delete/:id").delete(deletePost);

module.exports = router;
