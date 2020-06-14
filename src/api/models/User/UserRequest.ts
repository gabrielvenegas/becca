import { IsNumber, IsString, IsEmail, IsBoolean, IsPhoneNumber, IsOptional, MinLength, IsInt } from "class-validator";

export class UserRequest {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsEmail()
  mail: string;

  @IsBoolean()
  active: boolean = true;

  @IsPhoneNumber("BR")
  @IsOptional()
  phone?: string;

  @IsInt()
  @IsOptional()
  points?: number;
}
