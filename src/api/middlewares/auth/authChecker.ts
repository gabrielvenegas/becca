import { Action, UnauthorizedError } from "routing-controllers";
import { Container } from "typedi";
import { AuthService } from "../../services/Auth/AuthService";

export function authorizationChecker(): (action: Action, rolesToCheck: any[]) => Promise<boolean> | boolean {
  const authService = Container.get<AuthService>(AuthService);

  return async function innerAuthorizationChecker(action: Action, rolesToCheck: any[]): Promise<boolean> {
    try {
      return !!authService.parseTokenFromRequest(action.request);
    } catch (e) {
      return false;
    }
  };
}
