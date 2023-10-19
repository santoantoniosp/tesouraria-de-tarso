import { Member } from '../../../domain/models/member';
import { CreateMember, MemberDTO } from '../../../domain/use-cases/member/create-member';
import { FindMemberByCPF } from '../../../domain/use-cases/member/find-member-by-cpf';
import { FindMemberByEmail } from '../../../domain/use-cases/member/find-member-by-email';
import { badRequest, conflict } from '../../helpers/http-helpers';
import { DocumentValidator } from '../../protocols/document-validator';
import { EmailValidator } from '../../protocols/email-validator';
import { HttpRequest } from '../../protocols/http';

import { CreateMemberController } from './create-member-controller';

function makeSUT() {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  class DocumentValidatorStub implements DocumentValidator {
    isValid(document: string): boolean {
      return true;
    }
  }
  class DbCreateMemberStub implements CreateMember {
    create(memberDTO: MemberDTO): Promise<Member> {
      return new Promise((resolve) =>
        resolve({
          id: 'any_id',
          name: 'any_name',
          cpf: 'any_cpf',
          email: 'any_email@mail.com',
          password: 'any_password',
          communityRole: 'reader',
        }),
      );
    }
  }

  class FindMemberByEmailStub implements FindMemberByEmail {
    async findByEmail(email: string): Promise<Member | null> {
      return null;
    }
  }

  class FindMemberByCPFStub implements FindMemberByCPF {
    async findByCPF(cpf: string): Promise<Member | null> {
      return null;
    }
  }

  const documentValidatorStub = new DocumentValidatorStub();
  const emailValidatorStub = new EmailValidatorStub();
  const dbCreateUserStub = new DbCreateMemberStub();
  const findUserByEmailStub = new FindMemberByEmailStub();
  const findUserByCPFStub = new FindMemberByCPFStub();
  const sut = new CreateMemberController(
    emailValidatorStub,
    documentValidatorStub,
    findUserByEmailStub,
    findUserByCPFStub,
    dbCreateUserStub,
  );

  return {
    sut,
    emailValidatorStub,
    documentValidatorStub,
    dbCreateUserStub,
    findUserByEmailStub,
    findUserByCPFStub,
  };
}

describe('CreateMemberController', () => {
  test('Deve retornar 400 caso o name não seja passado.', async () => {
    const { sut } = makeSUT();

    const httpRequest: HttpRequest = { body: {} };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(badRequest({ error: 'name is required.' }));
  });

  test('Deve retornar 400 caso o CPF não seja passado.', async () => {
    const { sut } = makeSUT();

    const httpRequest: HttpRequest = { body: { name: 'any_name' } };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(badRequest({ error: 'cpf is required.' }));
  });

  test('Deve retornar 400 caso o e-mail não seja passado.', async () => {
    const { sut } = makeSUT();

    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        cpf: 'any_cpf',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(badRequest({ error: 'email is required.' }));
  });

  test('Deve chamar EmailValidador com o valor correto', async () => {
    const { sut, emailValidatorStub } = makeSUT();
    jest.spyOn(emailValidatorStub, 'isValid');

    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        cpf: 'any_cpf',
        email: 'any_email@mail.com',
      },
    };

    await sut.handle(httpRequest);

    expect(emailValidatorStub.isValid).toBeCalledWith('any_email@mail.com');
  });

  test('Deve retornar 400 caso o email não seja válido.', async () => {
    const { sut, emailValidatorStub } = makeSUT();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        cpf: 'any_cpf',
        email: 'any_email@mail.com',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(badRequest({ error: 'Invalid e-mail.' }));
  });

  test('Deve chamar EmailValidador com o valor correto', async () => {
    const { sut, documentValidatorStub } = makeSUT();
    jest.spyOn(documentValidatorStub, 'isValid');

    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        cpf: 'any_cpf',
        email: 'any_email@mail.com',
      },
    };

    await sut.handle(httpRequest);

    expect(documentValidatorStub.isValid).toBeCalledWith('any_cpf');
  });

  test('Deve retornar 400 caso o CPF não seja válido.', async () => {
    const { sut, documentValidatorStub } = makeSUT();
    jest.spyOn(documentValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        cpf: 'any_cpf',
        email: 'any_email@mail.com',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(badRequest({ error: 'Invalid CPF.' }));
  });

  test('Deve chamar CreateUser com o valor correto.', async () => {
    const { sut, dbCreateUserStub } = makeSUT();
    jest.spyOn(dbCreateUserStub, 'create');

    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        cpf: 'any_cpf',
        email: 'any_email@mail.com',
      },
    };

    await sut.handle(httpRequest);

    expect(dbCreateUserStub.create).toBeCalledWith({
      name: 'any_name',
      cpf: 'any_cpf',
      email: 'any_email@mail.com',
    });
  });

  test('Deve chamar FindUserByEmail com o valor correto.', async () => {
    const { sut, findUserByEmailStub } = makeSUT();
    jest.spyOn(findUserByEmailStub, 'findByEmail');

    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        cpf: 'any_cpf',
        email: 'any_email@mail.com',
      },
    };

    await sut.handle(httpRequest);

    expect(findUserByEmailStub.findByEmail).toBeCalledWith('any_email@mail.com');
  });

  test('Deve retornar 409 caso o email já esteja em uso.', async () => {
    const { sut, findUserByEmailStub } = makeSUT();
    jest.spyOn(findUserByEmailStub, 'findByEmail').mockResolvedValueOnce({
      id: 'any_id',
      name: 'any_name',
      cpf: 'any_cpf',
      email: 'any_email@mail.com',
      password: 'any_password',
      communityRole: 'reader',
    });

    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        cpf: 'any_cpf',
        email: 'any_email@mail.com',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(conflict({ error: 'Email already in use.' }));
  });

  test('Deve chamar FindUserByCPF com o valor correto.', async () => {
    const { sut, findUserByCPFStub } = makeSUT();
    jest.spyOn(findUserByCPFStub, 'findByCPF');

    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        cpf: 'any_cpf',
        email: 'any_email@mail.com',
      },
    };

    await sut.handle(httpRequest);

    expect(findUserByCPFStub.findByCPF).toBeCalledWith('any_cpf');
  });

  test('Deve retornar 409 caso o CPF já esteja em uso.', async () => {
    const { sut, findUserByCPFStub } = makeSUT();
    jest.spyOn(findUserByCPFStub, 'findByCPF').mockResolvedValueOnce({
      id: 'any_id',
      name: 'any_name',
      cpf: 'any_cpf',
      email: 'any_email@mail.com',
      password: 'any_password',
      communityRole: 'reader',
    });

    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        cpf: 'any_cpf',
        email: 'any_email@mail.com',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(conflict({ error: 'CPF already in use.' }));
  });

  test('Deve chamar CreateUser com os valores corretos.', async () => {
    const { sut, dbCreateUserStub } = makeSUT();
    jest.spyOn(dbCreateUserStub, 'create');

    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        cpf: 'any_cpf',
        email: 'any_email@mail.com',
      },
    };

    await sut.handle(httpRequest);

    expect(dbCreateUserStub.create).toBeCalledWith({
      name: 'any_name',
      cpf: 'any_cpf',
      email: 'any_email@mail.com',
    });
  });

  test('Deve retornar 200 em caso de sucesso', async () => {
    const { sut } = makeSUT();

    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        cpf: 'any_cpf',
        email: 'any_email@mail.com',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.body).toEqual({
      id: 'any_id',
      name: 'any_name',
      cpf: 'any_cpf',
      email: 'any_email@mail.com',
    });
  });
});
