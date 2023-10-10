import { Decrypter } from "../../domain/use-cases/cryptography/decrypter";
import { FindMemberById } from "../../domain/use-cases/member/find-member-by-id";
import { HttpRequest } from "../protocols/http";

export class LoadMemberFromRequest {

  constructor(
    private readonly decrypter: Decrypter,
    private readonly findMemberById: FindMemberById
  ) {}

  async loadMember(httpRequest: HttpRequest) {
    const token = this.extractTokenFromHeader(httpRequest)
    if (!token)
      return null

    const payload = this.decryptToken(token)
    if (!payload)
      return null

    const member = await this.findMemberById.findById(payload.sub)
    return member
  }

  private extractTokenFromHeader(httpRequest: HttpRequest): string | undefined {
    const [type, token] = httpRequest.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }

  private decryptToken(token: string): { sub: string } | null {
    const payload = this.decrypter.decrypt(token)
    return payload
  }
}
