import { Post, Body, JsonController } from "routing-controllers";
import Container from "typedi";
import { IWhatsappService } from "../../interfaces/Whatsapp/IWhatsappService";
import { WhatsappService } from "../../services/Whatsapp/WhatsappService";
import questions from "../../conversation.json";

@JsonController("/becca")
export class WhatsappController {
  private whatsappService: IWhatsappService;

  constructor() {
    this.whatsappService = Container.get(WhatsappService);
  }

  @Post("/send-message")
  sendInitialMessage(@Body() params: any) {
    const { number, message } = params;
    return this.whatsappService.sendMessage(number, message);
  }

  @Post("/conversation")
  startConversation(@Body() params: any) {
    if (params.Body && !params.Body.Info.FromMe) {
      let answer = "";
      const text = params.Body.Text.toLowerCase();
      const phone = params.Body.Info.RemoteJid.substring(0, params.Body.Info.RemoteJid.indexOf("@"));
      const positiveIntention = RegExp(/^(sim|quero|quer|s|querosim)/i);

      if (positiveIntention.test(text)) {
        answer = "Se estiver sentindo alguma dor pode me falar que vou te indicar um médico.";
      } else {
        const a = questions.find(item => item.question === text);
        answer = a?.answer || "Não entendi, estou melhorando e aprendendo novas coisas todos os dias.";

        if (a?.isLocation) {
          setTimeout(() => {
            this.whatsappService.sendLocation(phone);
          }, 3000);
        }
      }

      return this.whatsappService.sendMessage(phone, answer);
    } else {
      return {};
    }
  }
}
