import { IsString } from "class-validator";

export class AuthResponse {
  @IsString()
  token: string;

  constructor() {}
}
