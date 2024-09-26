import type { DatabaseHandler } from "@/app/plugins/database/DatabaseHandler";
import type { User } from "@/app/useCases/User";
import type { SessionContext } from "@/types";

declare module "@types/express-serve-static-core" {
  interface Request {
    sessionContext: SessionContext;
    database: DatabaseHandler;
    loggedUser: User;
  }
}
