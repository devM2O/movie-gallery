const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  label: String,
  comment: {
  type: String,
  required: true,
  },
  date: String,
  vname: String
});

const videoSchema = {
  name: String,
  rating: String,
  review: String,
  image: String,
  link: String,
  comment: [commentSchema]
};


//mongoose comment collection
const Comment = mongoose.model("comment", commentSchema);

//mongoose video collection
const Video = mongoose.model("video", videoSchema);


exports.comment = Comment;
exports.video = Video;
