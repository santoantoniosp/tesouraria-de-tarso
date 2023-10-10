export type Community = {
  id: string;
  name: string;
  address: {
    logradouro: string;
    neighborhood: string;
    zipCode: string;
    number: string;
    complement: string | null;
  } | null
}

export type CommunityDTO = {
  name: string;
  address: {
    logradouro: string;
    neighborhood: string;
    zipCode: string;
    number: string;
    complement: string | null;
  }
}

export interface CreateCommunity {
  create(communityDTO: CommunityDTO): Promise<Community>
}
