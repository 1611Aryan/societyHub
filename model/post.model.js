const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    societyName: { type: String, required: true },
    societyId: String,
    caption: { type: String, required: true },
    img: {
      data: Buffer,
      contentType: String,
    },
    date: Date,
    like: Boolean,
    bookmark: Boolean,
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
