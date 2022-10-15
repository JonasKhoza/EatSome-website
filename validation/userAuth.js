function signupValidation(email, confirmEmail, password, res) {
  if (
    email.trim() !== confirmEmail.trim() ||
    !email.includes("@") ||
    !confirmEmail.includes("@") ||
    password.length < 6
  ) {
    return res.render("/signup");
    //  console.log(
    //   "Emails must be the same, password must not be less than 6 characters long!"
    // );
  }
}

module.exports = {
  signupValidation: signupValidation,
};
