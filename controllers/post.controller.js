const multer = require("multer");
const fs = require("fs");
const path = require("path");

let Post = require("./../model/post.model");

exports.getPosts = (req, res) => {
  const limit = Number(req.params.limit);
  const skip = Number(req.params.skip);
  console.log(limit, skip, req.body);
  Post.find()
    .limit(limit)
    .skip(skip)
    .then(posts => res.status(200).send(posts))
    .catch(err => res.status(400).send(`Error: ${err}`));
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname.toLowerCase().split(" ").join("-") + "-" + Date.now()
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg, .jpeg and .webp format allowed!"));
    }
  },
});
exports.uploadSingle = upload.single("img");

exports.createPost = (req, res) => {
  const societyName = req.body.societyName;
  const societyId = req.body.societyId;
  const caption = req.body.caption;
  const bookmark = false;
  const like = false;
  const img = {
    data: fs.readFileSync(
      path.join(__dirname, "../" + "uploads/" + req.file.filename)
    ),
    contentType: req.file.mimetype,
  };
  const date = new Date();
  const newPost = new Post({
    societyName,
    societyId,
    caption,
    img,
    date,
    bookmark,
    like,
  });
  newPost
    .save()
    .then(() => {
      res.send("Post created");
      fs.unlink(
        path.join(__dirname, "../" + "uploads/" + req.file.filename),
        err => {
          if (err) console.log(err);
          else console.log("Temporary file deleted");
        }
      );
    })
    .catch(err => console.log(err));
};

exports.editPost = (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      post.bookmark = req.body.bookmark;
      post.like = req.body.like;
      post
        .save()
        .then(() => res.send("Updated"))
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(404).send(err));
};

exports.setSocietyId = (req, res) => {
  Post.updateOne(
    { _id: req.params.id },
    { $set: { societyId: req.body.societyId } }
  )
    .then(() => res.send("Post updated with Id"))
    .catch(err => console.log(err));
};

exports.updateAll = (req, res) => {
  Post.updateMany({ $set: { like: false, bookmark: false } })
    .then(() => res.send("Posts Updated"))
    .catch(err => console.log(err));
};

exports.deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.send("Post Deleted"))
    .catch(err => res.status(400).send(`Error: ${err}`));
};
