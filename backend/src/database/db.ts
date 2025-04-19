import mongoose from "mongoose";

class DB {
  constructor() {
    // Connect to the database.
    const dbUrl = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    mongoose.connect(process.env.DB_PRODUCTION || dbUrl);
  }
}

export default DB;
