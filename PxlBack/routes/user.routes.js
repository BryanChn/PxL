const router = require("express").Router();
const fs = require("fs");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (
      fs.existsSync(
        "./client/public/uploads/profil/" + req.body.userId + ".jpg"
      )
    ) {
      fs.unlinkSync(
        "./client/public/uploads/profil/" + req.body.userId + ".jpg"
      );
    }
    cb(null, "./client/public/uploads/profil");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.userId + ".jpg");
  },
});
const upload = multer({ storage: storage, limits: { fileSize: 10485760 } });

// auth routes
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// user db
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.followUser);
router.patch("/unfollow/:id", userController.UnfollowUser);

// upload profil image
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

// router.get("/upload/picture/:picture")

module.exports = router;
