const UserModel = require("../models/user.model");

module.exports.uploadProfil = async (req, res) => {
  const fileName = req.params.id + ".jpg";

  try {
    UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: { picture: "./uploads/profil/" + fileName } },
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
