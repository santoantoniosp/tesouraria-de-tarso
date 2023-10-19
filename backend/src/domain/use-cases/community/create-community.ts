export type Community = {
  id: string;
  name: string;
  address: {
    logradouro: string;
    neighborhood: string;
    zipCode: string;
    number: string;
    complement: string | null;
  } | null;
};

export type CommunityDTO = {
  name: string;
  address: {
    logradouro: string;
    neighborhood: string;
    zipCode: string;
    number: string;
    complement: string | null;
  };
};

export interface ICreateCommunity {
  create(communityDTO: CommunityDTO): Promise<Community>;
}
