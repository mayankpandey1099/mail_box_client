const ReceivedMail = require("../models/ReceivedMail");
const SentMail = require("../models/sendMail");
const User = require("../models/userModel");

const createEmail = async (req, res) => {
  const { from, to, subject, body } = req.body;

  try {
    const recipient = await User.findOne({
      where: { email: to },
    });

    if (!recipient) {
      return res.status(404).json({ error: "Recipient not found" });
    }

    const sender = await User.findOne({
      where: { email: from },
    });

    if (!sender) {
      return res.status(404).json({ error: "Sender not found" });
    }

    const receivedEmail = await ReceivedMail.create({
      userId: recipient.id,
      senderEmail: from,
      subject,
      body,
    });

    const sentEmail = await SentMail.create({
      userId: sender.id,
      recipientEmail: to,
      subject,
      body,
    });

    res.status(201).json({ receivedEmail, sentEmail });
  } catch (error) {
    console.error("Error creating email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getInbox = async (req, res) => {
  try {
    const emails = await ReceivedMail.findAll({
      where: { userId: req.user.userId },
      order: [["createdAt", "DESC"]],
    });
    const unreadCount = await ReceivedMail.count({
      where: { userId: req.user.userId, isRead: false },
    });
    res.status(200).json({ emails, unreadCount });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSentBox = async (req, res) => {
  try {
    const emails = await SentMail.findAll({
      where: { userId: req.user.userId },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(emails);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteInboxMail = async (req, res) => {
  try {
    const inboxId = req.params.id;
    const email = await ReceivedMail.findOne({
      where: {
        id: inboxId,
        userId: req.user.userId,
      },
    });

    if (!email) {
      return res.status(404).json({ error: "Email not found" });
    }

    await ReceivedMail.destroy({
      where: { id: inboxId },
    });

    res.status(200).json({ message: "Email deleted successfully" });
  } catch (error) {
    console.error("Error deleting email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteSentBoxMail = async (req, res) => {
  try {
    const sentboxId = req.params.id;
    const email = await SentMail.findOne({
      where: {
        id: sentboxId,
        userId: req.user.userId,
      },
    });

    if (!email) {
      return res.status(404).json({ error: "Email not found" });
    }

    await SentMail.destroy({
      where: { id: sentboxId },
    });

    res.status(200).json({ message: "Email deleted successfully" });
  } catch (error) {
    console.error("Error deleting email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateInboxReadStatus = async (req, res) => {
  try {
    const emailId = req.params.id;
    
    const email = await ReceivedMail.findOne({
      where: {
        id: emailId,
        userId: req.user.userId,
      },
    });

    if (!email) {
      return res.status(404).json({ error: "Email not found" });
    }

    email.isRead = true;
    await email.save();

    res
      .status(200)
      .json({ message: "Received Email read status updated successfully", email });
  } catch (error) {
    console.error("Error updating received email read status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateSentboxReadStatus = async (req, res) => {
  try {
    const emailId = req.params.id;

    const email = await SentMail.findOne({
      where: {
        id: emailId,
        userId: req.user.userId,
      },
    });

    if (!email) {
      return res.status(404).json({ error: "Email not found" });
    }

    email.isRead = true;
    await email.save();

    res
      .status(200)
      .json({ message: "Sent Email read status updated successfully", email });
  } catch (error) {
    console.error("Error updating sent email read status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { createEmail, getInbox, getSentBox, deleteInboxMail, deleteSentBoxMail, updateInboxReadStatus, updateSentboxReadStatus};
