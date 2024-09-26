import type { SystemCompany } from "@/types/SystemCompany";

export interface SystemCompaniesRepository {
  getByName(name: string): Promise<SystemCompany | undefined>;
}
