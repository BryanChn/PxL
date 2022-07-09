const UserModel = require("../models/user.model");

module.exports.uploadProfil = async (req, res) => {
  const fileName = req.body.userId + ".jpg";
  console.log(fileName);

  try {
    UserModel.findByIdAndUpdate(
      req.body.userId,
      {
        $set: {
          picture: "./uploads/profil/" + fileName,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
