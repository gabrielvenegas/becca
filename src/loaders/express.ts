import { Application } from "express";
import { createExpressServer } from "routing-controllers";
import { MicroframeworkSettings } from "microframework";
import { env } from "../env";
import { authorizationChecker } from "../api/middlewares/auth/authChecker";
import { currentUserChecker } from "../api/middlewares/auth/currentUserChecker";
import { operation } from "retry";
import { success, error } from "log-symbols";

export const expressLoader = (settings: MicroframeworkSettings | undefined) => {
  if (settings) {
    /**
     * It creates a new express server instance.
     */
    const expressApp: Application = createExpressServer({
      cors: true,
      classTransformer: true,
      routePrefix: env.app.routePrefix,
      defaultErrorHandler: true,
      /**
       * We can add options about how routing-controllers should configure itself.
       * Here we specify what controllers should be registered in our express server.
       */
      controllers: env.app.dirs.controllers,
      middlewares: env.app.dirs.middlewares,
      interceptors: env.app.dirs.interceptors,

      /**
       * Authorization features
       */
      authorizationChecker: authorizationChecker(),
      currentUserChecker: currentUserChecker(),
    });

    // Run application to listen on given port
    if (!env.isTest) {
      const op = operation();
      op.attempt(currentAttempt => {
        const server = expressApp.listen(env.app.port).on("error", (err: any) => {
          console.log(error, "[APP] - Something went wrong, error code is:", err.code, "retrying... ", currentAttempt);
          if (op.retry(err)) {
            return;
          }
        });

        if (server.listening) {
          console.log(success, "[APP] - Application is up and running");
        }

        settings.setData("express_server", server);
      });
    }

    // Here we can set the data for other loaders
    settings.setData("express_app", expressApp);
  }
};
