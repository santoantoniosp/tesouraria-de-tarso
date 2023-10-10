import { User } from "../../entities/user";
import { httpClient } from "../http-client";

type MeResponse = User

export async function me() {
  const { data } = await httpClient.get<MeResponse>('/members/me')

  return data;
}
