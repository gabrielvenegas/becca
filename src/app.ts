import "reflect-metadata";
import { bootstrapMicroframework } from "microframework";
import { expressLoader } from "./loaders/express";
import { swaggerLoader } from "./loaders/swagger";
import { iocLoader } from "./loaders/ioc";
import { typeormLoader } from "./loaders/typeorm";

bootstrapMicroframework({
  loaders: [typeormLoader, expressLoader, swaggerLoader], //scheduleWelcomeJob
});
