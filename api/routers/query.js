const express = require("express");
const { addMail, addWebsite, sslResults, deleteWebsite, deleteMail } = require("../controllers/query");
const { getAccess } = require("../middlewares/auth/index");
const router = express.Router();


router.post("/mail", getAccess, addMail);
router.delete("/mail", getAccess, deleteMail);
router.post("/website", getAccess, addWebsite);
router.delete("/website/:id", getAccess, deleteWebsite);
router.get("/sslresults", getAccess, sslResults);

module.exports = router;