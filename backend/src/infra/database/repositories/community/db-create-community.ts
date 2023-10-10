import { Community, CommunityDTO, CreateCommunity } from "../../../../domain/use-cases/community/create-community";
import { prismaClient } from "../../postgres-db";

export class DbCreateCommunity implements CreateCommunity {
  async create(communityDTO: CommunityDTO): Promise<Community> {
    const community = await prismaClient.community.create({
      data: {
        name: communityDTO.name,
        address: {
          create: {
            logradouro: communityDTO.address.logradouro,
            neighborhood: communityDTO.address.neighborhood,
            zipCode: communityDTO.address.zipCode,
            number: communityDTO.address.number,
            complement: communityDTO.address.complement,
          }
        },
        categories: {
          createMany: {
            data: [
              // Income
              { name: 'Doação', icon: 'salary', type: 'INCOME' },
              { name: 'Dízimo', icon: 'salary', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              // Expense
              { name: 'Limpeza', icon: 'home', type: 'EXPENSE' },
              { name: 'Luz', icon: 'home', type: 'EXPENSE' },
              { name: 'Água', icon: 'home', type: 'EXPENSE' },
              { name: 'Outro', icon: 'other', type: 'EXPENSE' },
            ]
          }
        }
      },
      include: {
        address: true
      }
    })

    return community
  }
}
