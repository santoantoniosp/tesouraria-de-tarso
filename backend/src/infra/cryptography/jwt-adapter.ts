import jwt from "jsonwebtoken";
import { Decrypter } from "../../domain/use-cases/cryptography/decrypter";

export class JwtAdapter implements Encrypter, Decrypter {
  encrypt(value: string): string {
    return jwt.sign(
      { sub: value },
      process.env.JWT_SECRET!,
      {
        expiresIn: '5d'
      }
    )
  }

  decrypt(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!) as { sub: string }
    } catch {
      return null
    }
  }
}
