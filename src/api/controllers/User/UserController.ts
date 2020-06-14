import { JsonController, Get, Post, Put, Delete, Param, QueryParams, Body, Authorized } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import Container from "typedi";
import { User } from "../../entities/User";
import { IUserService } from "../../interfaces/User/IUserService";
import { UserService } from "../../services/User/UserService";
import { UserRequest } from "../../models/User/UserRequest";
import { IWhatsappService } from "../../interfaces/Whatsapp/IWhatsappService";
import { WhatsappService } from "../../services/Whatsapp/WhatsappService";

// @Authorized()
@JsonController("/user")
@ResponseSchema(User)
@OpenAPI({ security: [{ bearerAuth: [] }] })
export class UserController {
  private userService: IUserService;
  private whatsappService: IWhatsappService;

  constructor() {
    this.userService = Container.get(UserService);
    this.whatsappService = Container.get(WhatsappService);
  }

  @Post("/")
  @OpenAPI({ summary: "Return a list of users" })
  async getAll(@Body() message: any) {
    try {
      if (message.Body && !message.Body.Info.FromMe) {
        const body = message.Body;
        const phone = body.Info.RemoteJid.substring(0, body.Info.RemoteJid.indexOf("@"));
        const name = body.Text;

        const user = { phone, name, mail: phone, active: true, points: 30 };
        const createdUser = await this.userService.createOne(user);

        if (createdUser) {
          this.whatsappService.changeWebhookToConversation();
          return this.whatsappService.sendMessage(
            user.phone,
            `Pronto ${user.name}! Seu cadastro foi realizado com sucesso e com isso você já ganhou 30 pontos! Para visualizar sua pontuação e conseguir acumular ainda mais pontos é só baixar o aplicativo. Com ele você vai ter um contato por voz comigo, poderá realizar exercícios de alongamentos, realizar inspeção guiada no caminhão e ainda trocar os pontos por benefícios. Link do app: https://bit.ly/2B49hmW`,
          );
        }
      }

      return false;
    } catch (err) {
      console.log(err);
    }
  }
}
