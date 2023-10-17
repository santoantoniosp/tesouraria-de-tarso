export interface Decrypter {
  decrypt(token: string): { sub: string } | null;
}
