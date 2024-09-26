import { envSettings } from "@/helpers";
import { server } from "./server";

const { serverPort } = envSettings();

server.listen(serverPort, () => {
  console.log(`Server is listening on ${serverPort}`);
});
