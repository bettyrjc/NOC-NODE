import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDataBase } from "./data/mongo";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

async function main() {
  await MongoDataBase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });
  // Server.start();
  // console.log(envs);

  //crear una coleccion 

  // const newLog = new LogModel({
  //   message: "Test message from mongo",
  //   level: "medium",
  //   origin: "app.ts",
  // });
  // await newLog.save();
  const logs = await LogModel.find();
  console.log('newLog', logs)


}
