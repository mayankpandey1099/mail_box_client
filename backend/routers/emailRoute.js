const express = require("express");
const {
  createEmail,
  getInbox,
  getSentBox,
  deleteInboxMail,
  deleteSentBoxMail,
  updateInboxReadStatus,
  updateSentboxReadStatus
} = require("../controllers/emailController");

const emailRouter = express.Router();

emailRouter.post("/send", createEmail);
emailRouter.get("/inbox", getInbox);
emailRouter.get("/sentbox", getSentBox);
emailRouter.delete("/inbox/:id", deleteInboxMail);
emailRouter.delete("/sentbox/:id", deleteSentBoxMail);
emailRouter.patch("/updateInbox/:id", updateInboxReadStatus);
emailRouter.patch("/updateSentbox/:id", updateSentboxReadStatus);

module.exports = emailRouter;

