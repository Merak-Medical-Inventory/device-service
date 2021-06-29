import './LoadEnv'; // Must be the first import
import "reflect-metadata";
import {createConnection} from "typeorm";
import "express-async-errors";
import logger from "@shared/Logger";
import { typeOrmConfig } from './config';
import app from './server';

createConnection(typeOrmConfig).then(async connection => {
  const port = Number(process.env.PORT || 3000);
    app.listen(port, () => {
      logger.info("Express server started on port: " + port);
    });
}).catch((error) => console.log(error));

export default app;

