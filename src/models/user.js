const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const _ = require("lodash");
const bcrypt = require('bcrypt');
const removeKeys = ["password", "createdAt", "updatedAt"];
const jwtUtil = require('../utils/jwt.util');

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: function(doc, ret) {
        return _.omit(ret, removeKeys);
      }
    }
  }
);
userSchema.pre("save", function(next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});
userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password,this.password);
}
userSchema.methods.generateJWT = function(){
  return jwtUtil.generateJWT(this.toJSON(),this.id);
}
module.exports = mongoose.model("user", userSchema);
