require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./utils/db");
const authRouter = require("./routers/authRoute");
const emailRouter = require("./routers/emailRoute");

const User = require("./models/userModel");
const ReceivedMail = require("./models/ReceivedMail");
const SentMail = require("./models/sendMail");

const { verify } = require("./middleware/verifyToken");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/sign", authRouter);
app.use("/mail", verify, emailRouter);


ReceivedMail.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
SentMail.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(ReceivedMail, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(SentMail, { foreignKey: "userId", onDelete: "CASCADE" });


const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  sequelize.sync();
  console.log("db connected successfully");
  console.log(`server is listening on port ${PORT}`);
});

