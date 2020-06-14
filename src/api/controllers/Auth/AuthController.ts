import { JsonController, Post, Body } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { AuthService } from "../../services/Auth/AuthService";
import Container from "typedi";
import { IAuthService } from "../../interfaces/Auth/IAuthService";
import { AuthResponse } from "../../models/Auth/AuthResponse";
import { AuthRequest } from "../../models/Auth/AuthRequest";

@JsonController("/auth")
export class AuthController {
  private authService: IAuthService;

  constructor() {
    this.authService = Container.get(AuthService);
  }

  @Post("/login")
  @OpenAPI({ summary: "Authenticate user" })
  login(@Body() user: AuthRequest): Promise<AuthResponse | undefined> {
    return this.authService.login(user);
  }
}
