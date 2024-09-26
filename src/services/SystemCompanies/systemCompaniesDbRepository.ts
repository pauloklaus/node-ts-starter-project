import type { DbHandler } from "@/infra/database";
import type { SystemCompany } from "@/types/SystemCompany";
import type { SystemCompaniesRepository } from "./types";
import type { SystemCompanyModel } from "./models";

export function systemCompaniesDbRepository(dbHandler: DbHandler): SystemCompaniesRepository {
  const companyTable = "systemcompanies";

  async function getByName(companyName: string): Promise<SystemCompany | undefined> {
    const companyResult = await dbHandler.query<SystemCompanyModel>(
      `SELECT
        ${companyTable}."id",
        ${companyTable}."name",
        ${companyTable}."active",
      FROM ${companyTable}
      WHERE lower(${companyTable}."name")=$1 AND ${companyTable}."active"=true`,
      [companyName.toLowerCase()]
    );

    if (!companyResult.length) {
      return;
    }

    return {
      id: companyResult[0].id,
      name: companyResult[0].name,
      active: !!companyResult[0].active,
    };
  }

  return {
    getByName,
  };
}
