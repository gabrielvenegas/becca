import axios from "axios";
import { Service } from "typedi";
import { IWhatsappService } from "../../interfaces/Whatsapp/IWhatsappService";

@Service()
export class WhatsappService implements IWhatsappService {
  private url: string = "http://v4.chatpro.com.br/chatpro-wsj661pkky/api/v1";
  private token: string = "6cf2dd0071723816234914379f105fbb699b6e3d";
  constructor() {}

  async sendMessage(number: string, message: string) {
    try {
      const res = await axios.post(
        `${this.url}/send_message`,
        { menssage: message, number },
        { headers: { Authorization: this.token, "Content-Type": "application/json" } },
      );

      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async changeWebhookToConversation() {
    try {
      const res = await axios.post(
        `${this.url}/webhook`,
        { webhook: "http://bb3698e4abf8.ngrok.io/api/becca/conversation" },
        { headers: { Authorization: this.token, "Content-Type": "application/json" } },
      );

      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async sendLocation(number: string) {
    try {
      const res = await axios.post(
        `${this.url}/send_location`,
        {
          address: "Av. Cel. Silva Téles, 721 - Cambuí, Campinas - SP, 13024-001, Brazil",
          lat: -22.8934569,
          lng: -47.050741,
          name: "Clínica Cardiologia Reabilitação",
          number,
        },
        { headers: { Authorization: this.token, "Content-Type": "application/json" } },
      );

      return res;
    } catch (err) {
      console.log(err);
    }
  }
}
