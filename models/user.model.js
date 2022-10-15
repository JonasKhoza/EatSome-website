const db = require("../data/database");
const bcrypt = require("bcryptjs");

class User {
  constructor(email, password, confirmEmail) {
    this.email = email;
    this.password = password;
    this.confirmEmail = confirmEmail;
  }

  async saveUser() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    const user = {
      email: this.email,
      password: hashedPassword,
    };
    return db.getDb().collection("user").insertOne(user);
  }

  findUser() {
    return db.getDb().collection("user").findOne({ email: this.email });
  }
}

module.exports = User;
