import bcrypt from "bcrypt";

export async function generateHashedPassword(password: string, saltRounds = 10): Promise<string> {
  return await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (error: Error | undefined, hash: string) => {
      if (error) {
        reject(error);
      }

      resolve(hash);
    });
  });
}
