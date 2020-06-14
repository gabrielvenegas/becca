import { QueryParameters } from "../../models/QueryParameters";
import { UserRequest } from "../../models/User/UserRequest";
import { User } from "../../entities/User";

export interface IUserService {
  fetch(name: string): Promise<[User[], number]>;
  fetchOne(id: number, relations?: string): Promise<User>;
  createOne(user: UserRequest): Promise<User>;
  deleteOne(id: number): Promise<any>;
  updateOne(user: UserRequest): Promise<User>;
  findOneByMail(mail: string): Promise<User>;
}
