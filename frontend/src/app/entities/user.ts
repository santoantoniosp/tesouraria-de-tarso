export enum CommunityRole {
  owner = 'owner',
  contributor = 'contributor',
  reader = 'reader'
}

export type User = {
  id: string
  name: string
  cpf: string
  email: string
  communityRole: keyof typeof CommunityRole
  community: {
    id: string
    name: string
  }
}
