const logger = require("../config/winston");
const { undoSeedUsers } = require("./user_seeders");

const runSeeders = async () => {
  logger.info("Undo Seeders started");
  await undoSeedUsers();
  logger.info("Undo Seeders succeeded");
};

runSeeders().catch((error) => {
  logger.error("Undo Seeders failed:", error);
  process.exit(1);
});