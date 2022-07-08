const router = require("express").Router();
const userPostController = require("../controllers/userPost.controller");

router.get("/", userPostController.ReadPost);
router.post("/", userPostController.CreatePost);
router.put("/:id", userPostController.UpdatePost);
router.delete("/:id", userPostController.DeletePost);
router.patch("/like-post/:id", userPostController.LikePost);
router.patch("/unlike-post/:id", userPostController.UnlikePost);

// comments
router.patch("/comment-post/:id", userPostController.CommentPost);
router.patch("/edit-comment-post/:id", userPostController.EditCommentPost);
router.delete("/delete-comment-post/:id", userPostController.DeleteCommentPost);
module.exports = router;
