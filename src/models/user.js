const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const _ = require("lodash");
const bcrypt = require('bcrypt');
const removeKeys = ["password"];

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
    toObject: {
      transform: function(doc, ret) {
        return _.omit(ret, removeKeys);
      }
    },
    toJSON: {
      transform: function(doc, ret) {
        return _.omit(ret, removeKeys);
      }
    }
  }
);
userSchema.pre("save", function(next) {
  console.log(this);
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});
module.exports = mongoose.model("user", userSchema);
