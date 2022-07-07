const userModel = require("../models/user.model");
const ObjectID = require("mongodb").ObjectId;

// get all users
module.exports.getAllUsers = async (req, res) => {
  const users = await userModel.find().select("-password");
  res.status(200).json(users);
};

// get user info
module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).json({
      message: "Invalid id",
    });
  }
  userModel
    .findById(req.params.id, (err, docs) => {
      if (err) {
        return res.status(500).json({
          message: "Error getting user",
        });
      }
      res.status(200).json(docs);
    })
    .select("-password");
};

// update user bio
module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).json({
      message: "Invalid id :" + req.params.id,
    });
  }
  try {
    userModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultOnInsert: true },
      (err, docs) => {
        if (err) {
          return res.status(500).json({
            message: "Error updating user" + err,
          });
        }
        res.status(200).json(docs);
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: "Error updating user" + err,
    });
  }
};

// delete user
module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).json({
      message: "Invalid id :" + req.params.id,
    });
  }
  try {
    userModel.findByIdAndDelete(req.params.id, (err, docs) => {
      if (err) {
        return res.status(500).json({
          message: "Error deleting user" + err,
        });
      }
      res.status(200).json({ message: "User deleted" + docs });
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error deleting user" + err,
    });
  }
};

// follow user
module.exports.followUser = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  ) {
    return res.status(400).json({
      message: "Invalid id :" + req.params.id,
    });
  }
  try {
    // add to the follower list
    userModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          following: req.body.idToFollow,
        },
      },
      { new: true, upsert: true },
      (err, docs) => {
        if (err) {
          return res.status(500).json({
            message: "Error following user" + err,
          });
        }
        res.status(200).json({ message: "User followed" });
      }
    );

    // add to following list

    userModel.findByIdAndUpdate(
      req.body.idToFollow,
      {
        $addToSet: {
          followers: req.params.id,
        },
      },
      { new: true, upsert: true },
      (err, docs) => {
        if (err) {
          return res.status(500).json({
            message: "Error following user" + err,
          });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: "Error following user" + err,
    });
  }
};

// unfollow user
module.exports.UnfollowUser = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnFollow)
  ) {
    return res.status(400).json({
      message: "Invalid id :" + req.params.id,
    });
  }
  try {
    userModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          following: req.body.idToUnFollow,
        },
      },
      { new: true, upsert: true },
      (err, docs) => {
        if (err) {
          return res.status(500).json({
            message: "Error unfollowing user" + err,
          });
        }
        res.status(200).json(docs);
      }
    );
    // remove from following list
    userModel.findByIdAndUpdate(
      req.body.idToUnFollow,
      {
        $pull: {
          followers: req.params.id,
        },
      },
      { new: true, upsert: true },
      (err, docs) => {
        if (err) {
          return res.status(500).json({
            message: "Error unfollowing user" + err,
          });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: "Error unfollowing user" + err,
    });
  }
};
