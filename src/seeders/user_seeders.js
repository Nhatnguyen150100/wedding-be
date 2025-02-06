const mongoose = require("mongoose");
const { deleteMany, insertMany } = require("../models/user");
const dotenv = require("dotenv");
const logger = require("../config/winston");
dotenv.config();

const { connect, connection } = mongoose;

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("Connected to Mongoose");
  } catch (error) {
    logger.error("Connect to Mongoose failed:", error);
    process.exit(1);
  }
};

const users = [
  {
    name: "Nguyen Van A",
  },
  {
    name: "Nguyen Van A1",
    isPublicMessage: true,
    message: "Chúc hạnh phúc",
  },
  {
    name: "Nguyen Van A2",
  },
  {
    name: "Nguyen Van A3",
  },
  {
    name: "Nguyen Van A4",
  },
  {
    name: "Nguyen Van A5",
  },
  {
    name: "Nguyen Van A6",
  },
];

const insertMoreUser = [
  {
    name: "Nguyen Van B",
    isPublicMessage: true,
    message: "Chúc hạnh phúc của B",
  },
];

const seedUsers = async () => {
  await connectDB();

  await deleteMany();

  await insertMany(users);
  logger.info("Insert items successfully");

  connection.close();
};

const seedMoreUsers = async () => {
  await connectDB();

  await insertMany(insertMoreUser);
  logger.info("Insert more items successfully");

  connection.close();
};

const undoSeedUsers = async () => {
  await connectDB();

  await deleteMany();

  logger.info("Remove items successfully");

  connection.close();
};

module.exports = { seedUsers, undoSeedUsers, seedMoreUsers };
