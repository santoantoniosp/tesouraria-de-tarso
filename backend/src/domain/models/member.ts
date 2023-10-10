enum CommunityRole {
  owner = "owner",
  contributor = "contributor",
  reader = "reader"
}

export type Member = {
  id: string;
  name: string;
  cpf: string;
  email: string;
  password: string;
  communityRole: keyof typeof CommunityRole
  communityId: string;
}
