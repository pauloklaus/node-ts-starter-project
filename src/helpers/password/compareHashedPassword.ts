import bcrypt from "bcrypt";

export async function compareHashedPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return await new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (error: Error | undefined, result: boolean) => {
      if (error) {
        reject(error);
      }

      resolve(result);
    });
  });
}
