import "reflect-metadata";
import { createUsers } from "./create-users";
import { AppDataSource } from "../../config/dataSource";

AppDataSource.initialize().then(async () => {
  await createUsers();
  await AppDataSource.destroy();
}).catch(error => console.log(error));

