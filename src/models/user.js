const { Schema, model } = require("mongoose");
const logger = require("../config/winston");

const guestByEnum = ["GROM", "BRIDE"];

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    guestBy: {
      type: String,
      enum: guestByEnum,
    },
    isPublicMessage: {
      type: Boolean,
      default: false,
      required: true,
    },
    arrive: {
      type: String,
    },
    message: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const deleteMany = async () => {
  try {
    const result = await User.deleteMany({});
    logger.info(`Đã xóa ${result.deletedCount} người dùng.`);
    return result;
  } catch (error) {
    logger.error('Lỗi khi xóa người dùng:', error);
    throw error;
  }
};

const insertMany = async (users) => {
  try {
    const validUsers = users.filter(user => user.name);
    
    if (validUsers.length === 0) {
      logger.warn('Không có người dùng hợp lệ để thêm.');
      return [];
    }

    const result = await User.insertMany(validUsers);
    logger.info(`Đã thêm ${result.length} người dùng.`);
    return result;
  } catch (error) {
    logger.error('Lỗi khi thêm người dùng:', error);
    throw error;
  }
};

const User = model("User", userSchema);

module.exports = { User, deleteMany, insertMany };