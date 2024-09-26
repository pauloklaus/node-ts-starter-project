import { SESClient, SendEmailCommand, MessageRejected } from "@aws-sdk/client-ses";
import { InfrastructureError } from "@/errors";
import type { Logger } from "@/infra/logger";
import type { MailContext } from "./MailContext";
import type { MailerHandler } from "./MailerHandler";

const UTF8 = "UTF-8";

export function awsSesHandler(
  awsSesHandler: SESClient,
  sender: string,
  logger: Logger
): MailerHandler {
  async function send(emailContext: MailContext): Promise<void> {
    const params = new SendEmailCommand({
      Destination: {
        CcAddresses: emailContext.cc,
        BccAddresses: emailContext.bcc,
        ToAddresses: emailContext.to,
      },
      Message: {
        Body: {
          Html: {
            Charset: UTF8,
            Data: emailContext.htmlMessage ?? emailContext.message,
          },
          Text: {
            Charset: UTF8,
            Data: emailContext.message,
          },
        },
        Subject: {
          Charset: UTF8,
          Data: emailContext.subject,
        },
      },
      Source: sender,
      ReplyToAddresses: emailContext.replyTo,
    });

    try {
      await awsSesHandler.send(params);
    } catch (error) {
      logger.error(`${error}`);

      if (error instanceof MessageRejected) {
        throw new InfrastructureError("sendEmailHandler:rejected");
      }

      throw new InfrastructureError("sendEmailHandler:send");
    }
  }

  return {
    send,
  };
}
