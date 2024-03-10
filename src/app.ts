import { PrismaClient } from "@prisma/client";
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

  const prisma = new PrismaClient();
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     message: "Test message from prisma",
  //     level: "MEDIUM",
  //     origin: "app.ts",
  //   },
  // });

  // console.log({ newLog });
  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     level: "MEDIUM",
  //   },
  // });
  // console.log(logs);
  Server.start();

  //crear una coleccion

  // const newLog = new LogModel({
  //   message: "Test message from mongo",
  //   level: "medium",
  //   origin: "app.ts",
  // });
  // await newLog.save();
  // const logs = await LogModel.find();
  // console.log('newLog', logs)
}
