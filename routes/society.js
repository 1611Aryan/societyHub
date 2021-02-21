const router = require("express").Router();
const {
  getSocieties,
  deleteSociety,
  postSociety,
  uploadSingle,
  updateSociety,
  getSocietyById,
  getSocietyByName,
} = require("../controllers/society.controller");

//?Gets all the societies
router.route("/").get(getSocieties);

//?Gets society based on ID
router.route("/:id").get(getSocietyById);

//?Post request to create a society
router.route("/add").post(uploadSingle, postSociety);

//?Post Request to update society
router.route("/update/:id").post(updateSociety);

//?Delete Request to delete society
router.route("/doom/:id").delete(deleteSociety);

module.exports = router;
