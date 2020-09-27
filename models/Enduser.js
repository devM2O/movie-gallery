const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const commentSchema = new mongoose.Schema({
  label: String,
  comment: {
  type: String,
  required: true,
  },
  date: String,
  flag: {
    type: String,
    default: 'true'
  }
});

const videoSchema = {
  name: String,
  rating: String,
  review: String,
  image: String,
  link: String,
  release: String,
  categorie: String,
  popular: {
    type: String,
    default: 'normal'
  }
  // comment: [commentSchema]
};


//mongoose comment collection
const Comment = mongoose.model("comment", commentSchema);

//mongoose video collection
const Video = mongoose.model("video", videoSchema);


exports.comment = Comment;
exports.video = Video;
