import type { Logger } from "@/infra/logger";
import type { NotifierHandler } from "./NotifierHandler";

export function slackHandler(webhookUrl: string, logger: Logger): NotifierHandler {
  function disabled(): boolean {
    const notDefinedWebhook = !webhookUrl || webhookUrl === "";

    if (notDefinedWebhook) {
      logger.debug("slackHandler: URL not defined");
    }

    return notDefinedWebhook;
  }

  async function send(message: string): Promise<void> {
    if (disabled()) {
      return;
    }

    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: message }),
    });
  }

  return {
    send,
  };
}
