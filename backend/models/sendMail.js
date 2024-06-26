const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const SentMail = sequelize.define(
  "sentmail",
  {
    recipientEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = SentMail;
