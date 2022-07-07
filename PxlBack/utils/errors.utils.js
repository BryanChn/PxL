module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };
  if (err.message.includes("pseudo"))
    errors.pseudo = "Pseudo already used or inccorrect";

  if (err.message.includes("email")) errors.email = "Email inccorrect";

  if (err.message.includes("password"))
    errors.password = "Password too short more than 6 characters";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.email = "Pseudo already used";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Email already used";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };
  if (err.message.includes("email")) errors.email = "Email incorrect";

  if (err.message.includes("password")) errors.password = "Password incorrect";

  return errors;
};
