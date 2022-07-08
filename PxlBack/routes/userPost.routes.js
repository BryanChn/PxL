const router = require("express").Router();
const fs = require("fs");
const userPostController = require("../controllers/userPost.controller");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./client/public/uploads/post");
  },
  filename: function (req, file, cb) {
    cb(null, file.filename + ".jpg");
  },
});
const upload = multer({ storage: storage, limits: { fileSize: 10485760 } });

router.get("/", userPostController.ReadPost);
router.post("/", upload.single("picture"), userPostController.CreatePost);
router.put("/:id", userPostController.UpdatePost);
router.delete("/:id", userPostController.DeletePost);
router.patch("/like-post/:id", userPostController.LikePost);
router.patch("/unlike-post/:id", userPostController.UnlikePost);

// comments
router.patch("/comment-post/:id", userPostController.CommentPost);
router.patch("/edit-comment-post/:id", userPostController.EditCommentPost);
router.delete("/delete-comment-post/:id", userPostController.DeleteCommentPost);
module.exports = router;
