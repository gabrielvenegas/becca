import { IsString } from "class-validator";

export class AuthRequest {
  @IsString()
  phone: string;

  @IsString()
  password: string;
  constructor() {}
}
