import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { IsNumber, IsString, IsPhoneNumber, IsOptional, IsEmail, IsBoolean, IsInt } from "class-validator";
import { compare, hash } from "bcrypt";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id?: number;

  @Column({ unique: true })
  @IsString()
  name: string;

  @Column()
  @IsInt()
  @IsOptional()
  points?: string;

  @Column()
  @IsString()
  @IsOptional()
  password?: string;

  @Column({ default: "" })
  @IsString()
  @IsEmail()
  @IsOptional()
  mail?: string;

  @Column({ default: true })
  @IsBoolean()
  active?: boolean = true;

  @Column({ nullable: true })
  @IsPhoneNumber("BR")
  @IsOptional()
  phone?: string;

  @Column({ default: false })
  @IsBoolean()
  isSuper?: boolean = false;

  async checkPassword(candidatePassword: string): Promise<boolean> {
    return this.password ? compare(candidatePassword, this.password) : false;
  }

  @BeforeInsert()
  async encryptPassword(): Promise<void> {
    this.password = await hash(this.password, 1);
  }
}
