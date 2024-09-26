import type { SystemCompany } from "@/types/SystemCompany";
import type { SystemCompaniesRepository } from "./types";

export function systemCompaniesService(repository: SystemCompaniesRepository) {
  async function getByName(name: string): Promise<SystemCompany | undefined> {
    return await repository.getByName(name);
  }

  return {
    getByName,
  };
}
