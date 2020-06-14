import { Action, UnauthorizedError } from "routing-controllers";
import { Container } from "typedi";
import { AuthService } from "../../services/Auth/AuthService";
import { getRepository } from "typeorm";
import { User } from "../../entities/User";

export function currentUserChecker(): (action: Action) => Promise<User> | User {
  const authService = Container.get<AuthService>(AuthService);

  return async function innerCurrentUserChecker(action: Action): Promise<User> {
    const token = authService.parseTokenFromRequest(action.request) || "";
    const { user_id } = authService.getTokenInfo(token);

    try {
      const userRepository = getRepository(User);

      return userRepository.findOneOrFail(user_id, { relations: ["department", "roles"] });
    } catch (err) {
      throw new UnauthorizedError(err);
    }
  };
}
