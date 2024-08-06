import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

const main = async () => {
  try {
    // database connection
    await mongoose.connect(config.DATABASE_URL as string, {
      dbName: config.DATABASE_NAME as string,
    });

    app.listen(config.PORT, () => {
      console.warn(`\n server is listening on: ${config.PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};
main();
