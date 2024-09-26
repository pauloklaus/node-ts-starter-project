import type { MailContext } from "./MailContext";

export interface MailerHandler {
  send(emailContext: MailContext): Promise<void>;
}
