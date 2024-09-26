export interface NotifierHandler {
  send(message: string): Promise<void>;
}
