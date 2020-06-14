import * as dotenv from "dotenv";
import * as path from "path";

import { getOsEnv, getOsEnvArray, normalizePort, toBool, toNumber } from "./libs/env";

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({
  path: path.join(process.cwd(), `.env${process.env.NODE_ENV === "test" ? ".test" : ""}`),
});

/**
 * Environment variables
 */
export const env = {
  node: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",
  isDevelopment: process.env.NODE_ENV === "development",
  app: {
    name: getOsEnv("APP_NAME"),
    version: "",
    description: "",
    host: getOsEnv("APP_HOST"),
    schema: getOsEnv("APP_SCHEMA"),
    routePrefix: getOsEnv("APP_ROUTE_PREFIX"),
    port: normalizePort(process.env.PORT || getOsEnv("APP_PORT")),
    dirs: {
      entities: (getOsEnvArray("TYPEORM_ENTITIES") || [
        path.relative(path.join(process.cwd()), path.join(__dirname, "api/models/**/*{.js,.ts}")),
      ]) as string[],
      migrations: (getOsEnvArray("TYPEORM_MIGRATIONS") || [
        path.relative(path.join(process.cwd()), path.join(__dirname, "migrations/**/*{.js,.ts}")),
      ]) as string[],
      controllers: (getOsEnvArray("CONTROLLERS") || [
        path.join(__dirname, "api/controllers/**/*Controller{.js,.ts}"),
      ]) as string[],
      middlewares: (getOsEnvArray("MIDDLEWARES") || [
        path.join(__dirname, "api/middlewares/**/*Middleware{.js,.ts}"),
      ]) as string[],
      interceptors: (getOsEnvArray("INTERCEPTORS") || [
        path.join(__dirname, "api/interceptors/**/*Interceptor{.js,.ts}"),
      ]) as string[],
    },
  },
  log: {
    level: getOsEnv("LOG_LEVEL"),
    json: toBool(getOsEnv("LOG_JSON")),
    output: getOsEnv("LOG_OUTPUT"),
  },
  auth: {
    secret: getOsEnv("AUTH_SECRET"),
  },
  db: {
    type: getOsEnv("TYPEORM_CONNECTION"),
    host: getOsEnv("TYPEORM_HOST"),
    port: toNumber(getOsEnv("TYPEORM_PORT")),
    username: getOsEnv("TYPEORM_USERNAME"),
    password: getOsEnv("TYPEORM_PASSWORD"),
    database: getOsEnv("TYPEORM_DATABASE"),
    synchronize: toBool(getOsEnv("TYPEORM_SYNCHRONIZE")),
    logging: toBool(getOsEnv("TYPEORM_LOGGING")),
  },
  mega: {
    type: getOsEnv("TYPEORM_CONNECTION_MEGA"),
    host: getOsEnv("TYPEORM_HOST_MEGA"),
    username: getOsEnv("TYPEORM_USERNAME_MEGA"),
    password: getOsEnv("TYPEORM_PASSWORD_MEGA"),
  },
  ep: {
    type: getOsEnv("TYPEORM_CONNECTION_EP"),
    host: getOsEnv("TYPEORM_HOST_EP"),
    port: toNumber(getOsEnv("TYPEORM_PORT_EP")),
    database: getOsEnv("TYPEORM_DATABASE_EP"),
    username: getOsEnv("TYPEORM_USERNAME_EP"),
    password: getOsEnv("TYPEORM_PASSWORD_EP"),
    synchronize: toBool(getOsEnv("TYPEORM_SYNCHRONIZE_EP")),
    logging: toBool(getOsEnv("TYPEORM_LOGGING_EP")),
  },
  swagger: {
    enabled: toBool(getOsEnv("SWAGGER_ENABLED")),
    route: getOsEnv("SWAGGER_ROUTE"),
    file: getOsEnv("SWAGGER_FILE"),
    username: getOsEnv("SWAGGER_USERNAME"),
    password: getOsEnv("SWAGGER_PASSWORD"),
  },
  redis: {
    host: getOsEnv("REDIS_HOST"),
    port: getOsEnv("REDIS_PORT"),
    password: getOsEnv("REDIS_PASS"),
  },
  messageModule: {
    url: getOsEnv("MESSAGE_MODULE_URL"),
  },
  ldap: {
    host: getOsEnv("LDAP_HOST"),
    dn: getOsEnv("LDAP_DN"),
    username: getOsEnv("LDAP_USERNAME"),
    password: getOsEnv("LDAP_PASSWORD"),
  },
  commerceManager: {
    url: getOsEnv("COMMERCE_MANAGER_URL"),
  },
};
