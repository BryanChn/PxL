const userPostModel = require("../models/userPost.model");
const userModel = require("../models/user.model");
const UserPostModel = require("../models/userPost.model");
const ObjectID = require("mongodb").ObjectId;

module.exports.ReadPost = async (req, res) => {
  userPostModel
    .find((err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        console.log("Error in Retriving User Post :" + err);
      }
    })
    .sort({ createdAt: -1 });
};

module.exports.CreatePost = async (req, res) => {
  const newPost = new userPostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    video: req.body.video,
    likers: [],
    comments: [],
  });
  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.UpdatePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("Invalid id");
  }
  const updatedRecord = {
    message: req.body.message,
  };
  UserPostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        console.log("Error in Retriving User Post :" + err);
      }
    }
  );
};
module.exports.DeletePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("Invalid id");
  }
  UserPostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error in delete :" + err);
    }
  });
};

// gestion of like and unlike
module.exports.LikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    userPostModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likers: req.body.id } },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    userModel.findByIdAndUpdate(
      req.body.id,
      { $addToSet: { likes: req.params.id } },
      { new: true },
      (err, docs) => {
        if (!err) res.send("liked" + docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.UnlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    userPostModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { likers: req.body.id } },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    userModel.findByIdAndUpdate(
      req.body.id,
      { $pull: { likes: req.params.id } },
      { new: true },
      (err, docs) => {
        if (!err) res.send("Unliked" + docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

// comments
module.exports.CommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    userPostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
// edit comment in a post

module.exports.EditCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return userPostModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) return res.status(404).send("Comment not found" + err);
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.DeleteCommentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    userPostModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { comments: { _id: req.body.commentId } } },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        return res.status(500).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
