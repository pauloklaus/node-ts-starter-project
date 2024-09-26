export interface MailContext {
  to: string[];
  cc?: string[];
  bcc?: string[];
  replyTo?: string[];
  subject: string;
  message: string;
  htmlMessage?: string;
}
