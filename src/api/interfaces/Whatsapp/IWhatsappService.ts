export interface IWhatsappService {
  sendMessage(number: string, message: string): any;
  changeWebhookToConversation(): any;
  sendLocation(number: string): any;
}
