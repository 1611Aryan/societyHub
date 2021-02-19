const multer = require("multer");
const fs = require("fs");
const path = require("path");

// const imagemin = require("imagemin");
// const imageminJpegtran = require("imagemin-jpegtran");
// const imageminPngquant = require("imagemin-pngquant");
let Society = require("../model/society.model");

exports.getSocieties = (req, res) => {
  Society.find().then(society => res.send(society));
};

exports.getSocietyById = (req, res) => {
  Society.findById(req.params.id)
    .then(society => {
      if (society !== null) res.send(society);
      else res.status(404).send("Society Doesn't Exist");
    })
    .catch(err => {
      res.status(500).send(err);
    });
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

exports.uploadSingle = upload.single("logo");

exports.postSociety = (req, res) => {
  const name = req.body.name;
  const logo = {
    data: fs.readFileSync(
      path.join(__dirname, "../" + "uploads/" + req.file.filename)
    ),
    contentType: req.file.mimetype,
  };
  const email = req.body.email;
  const gensec1 = req.body.gensec1;
  const gensec2 = req.body.gensec2;
  const desc = req.body.desc;

  const newSociety = new Society({ name, logo, email, gensec1, gensec2, desc });

  newSociety
    .save()
    .then(() => {
      res.send("Society Created");
      fs.unlink(
        path.join(__dirname, "../" + "uploads/" + req.file.filename),
        err => {
          if (err) throw err;
          else console.log("temporary file deleted");
        }
      );
    })
    .catch(err => res.status(400).send(`Error: ${err}`));
};

exports.updateSociety = (req, res) => {
  Society.findById(req.params.id).then(society => {
    society.name = req.body.name;
    society.logo = {
      data: req.body.logo.data,
      contentType: "image/png",
    };
    society.email = req.body.email;
    society.gensec1 = req.body.gensec1;
    society.gensec2 = req.body.gensec2;
    society.desc = req.body.desc;
    society
      .save()
      .then(() => res.send("Details Updated"))
      .catch(err => res.status(400).send(`Error: ${err}`));
  });
};

exports.deleteSociety = (req, res) => {
  Society.findByIdAndDelete(req.params.id)
    .then(() => res.send("Society Deleted"))
    .catch(err => res.status(400).send(`Error: ${err}`));
};
