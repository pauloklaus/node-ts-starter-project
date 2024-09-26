import dns from "dns";

export async function getDomainTxtRecords(domain: string): Promise<string[]> {
  try {
    return await new Promise<string[]>((resolve, reject) => {
      dns.resolveTxt(domain, (err, records) => {
        err ? reject(err) : resolve(records ? records?.flat() : []);
      });
    });
  } catch {
    /* empty */
  }

  return [];
}
