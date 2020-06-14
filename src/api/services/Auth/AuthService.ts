import * as express from "express";
import { Service } from "typedi";
import { ITokenInfo } from "../../interfaces/Auth/ITokenInfo";
import * as jwt from "jsonwebtoken";
import { env } from "../../../env";
import { IAuthService } from "../../interfaces/Auth/IAuthService";
import { getRepository } from "typeorm";
import { User } from "../../entities/User";
import { AuthResponse } from "../../models/Auth/AuthResponse";
import { AuthRequest } from "../../models/Auth/AuthRequest";
import { UnauthorizedError } from "routing-controllers";

@Service()
export class AuthService implements IAuthService {
  constructor() {}

  public parseTokenFromRequest(req: express.Request): string | undefined {
    const authorization = req.header("authorization");
    // Retrieve the token form the Authorization header
    if (authorization && authorization.split(" ")[0] === "Bearer") {
      return authorization.split(" ")[1];
    }

    return authorization;
  }

  public getTokenInfo(token: string): ITokenInfo {
    try {
      const tokenInfo = <ITokenInfo>jwt.verify(token, env.auth.secret);

      return tokenInfo;
    } catch (err) {
      throw new UnauthorizedError();
    }
  }

  public async login({ phone, password = "admin" }: AuthRequest): Promise<AuthResponse | undefined> {
    const userRepository = getRepository(User);

    try {
      let user = await userRepository.findOne({
        where: { phone },
      });

      // check encrypted password
      if (!(await user?.checkPassword(password))) {
        throw new UnauthorizedError();
      }

      const token = this.generateJwt(user);

      return { token };
    } catch (err) {
      throw err;
    }
  }

  private generateJwt(user: User | undefined): any {
    if (user) {
      return jwt.sign({ user_id: user.id, username: user.name, isSuper: user.isSuper }, env.auth.secret, {
        expiresIn: "120h",
      });
    }
  }
}
