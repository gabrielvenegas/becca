import { Service } from "typedi";
import { Repository, getRepository, Like } from "typeorm";
import { User } from "../../entities/User";
import { IUserService } from "../../interfaces/User/IUserService";
import { UserRequest } from "../../models/User/UserRequest";
import { hash } from "bcrypt";
import { HttpError } from "routing-controllers";

@Service()
export class UserService implements IUserService {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository<User>(User);
  }

  async fetch({ name }: any = ""): Promise<[User[], number]> {
    return this.userRepository.findAndCount(
      name ? { where: { name: Like(`%${name}%`) } } : { order: { active: "DESC", name: "ASC" } },
    );
  }

  async fetchOne(id: number, { relations }: any): Promise<User> {
    const rel = relations.split(",");
    return this.userRepository.findOneOrFail({ where: { id }, relations: ["department"].concat(rel) });
  }

  async createOne(userRequest: UserRequest): Promise<User> {
    let user = new User();
    user = Object.assign<User, UserRequest>(user, userRequest); // mapping for class hooks
    user.password = await hash("admin", 1);

    return this.userRepository.save(user);
  }

  async deleteOne(id: number): Promise<any> {
    return this.userRepository.delete(id);
  }

  async updateOne(user: UserRequest): Promise<User> {
    const { id } = user;
    let userExists = await this.userRepository.findOneOrFail(id);
    userExists = Object.assign<User, UserRequest>(userExists, user);

    return this.userRepository.save(userExists);
  }

  async findOneByMail(mail: string): Promise<User> {
    return this.userRepository.findOneOrFail({ where: { mail } });
  }
}
