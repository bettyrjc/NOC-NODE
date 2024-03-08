import mongoose from "mongoose";

interface ConnectionOptions{
  mongoUrl: string;
  dbName: string;
}


export class MongoDataBase {

  static async connect(options: ConnectionOptions){
    const { mongoUrl, dbName } = options;
    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      });
     console.log('MongoDB connected')
    } catch (error) {
      console.error('Error connecting to the database', error);
    }
  }
}