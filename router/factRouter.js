const { Router } = require("express");
const bcrypt = require("bcrypt");
const { createFact, getFacts, deleteFact, getFactByID, updateFact, addlikes, dislike } = require("../controller/factController.js");
const Usermodel = require("../database/schema/factModel.js");
const factRouter = Router();
factRouter.post("/facts", createFact);
factRouter.get("/facts", getFacts);
factRouter.get("/facts/:userId", getFactByID);
factRouter.delete("/facts/:factId", deleteFact);
factRouter.put("/facts/:factId", updateFact);
factRouter.post("/facts/addlikes/:factId/:userId", addlikes);
factRouter.post("/facts/dislike/:factId/:userId", dislike);
// factRouter.edit("facts/:factId", editFact),
 
module.exports = factRouter;
