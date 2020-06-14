import expressBasicAuth from "express-basic-auth";
import { MicroframeworkLoader, MicroframeworkSettings } from "microframework";
import * as swaggerUi from "swagger-ui-express";
import { env } from "../env";
import { getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { MetadataStorage, getFromContainer } from "class-validator";

export const swaggerLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
  if (settings && env.swagger.enabled) {
    const expressApp = settings.getData("express_app");

    const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas;
    const schemas = validationMetadatasToSchemas(metadatas, {
      refPointerPrefix: "#/components/schemas/",
    });

    const routingControllersOptions = {
      routePrefix: env.app.routePrefix,
    };

    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage, routingControllersOptions, {
      components: {
        schemas,
        securitySchemes: {
          bearerAuth: {
            scheme: "bearer",
            type: "http",
            bearerFormat: "JWT",
          },
        },
      },
    });

    const swaggerFile = spec;

    // Add npm infos to the swagger doc
    swaggerFile.info = {
      title: env.app.name,
      description: env.app.description,
      version: env.app.version,
    };
    swaggerFile.host = `${env.app.host}:${env.app.port}`;
    swaggerFile.basePath = env.app.routePrefix;
    expressApp.use(
      env.swagger.route,
      env.swagger.username
        ? expressBasicAuth({
            users: {
              [`${env.swagger.username}`]: env.swagger.password,
            },
            challenge: true,
          })
        : (_req: any, res: any, next: () => any) => next(),
      swaggerUi.serve,
      swaggerUi.setup(swaggerFile),
    );
  }
};
