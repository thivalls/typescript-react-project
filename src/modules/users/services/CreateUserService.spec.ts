import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateAppointment', () => {
  it('Should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUsersServices = new CreateUserService(fakeUsersRepository);

    const user = await createUsersServices.execute({
      name: 'Thiago',
      email: 'teste@jest.com.br',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create user with same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUsersServices = new CreateUserService(fakeUsersRepository);

    await createUsersServices.execute({
      name: 'Thiago',
      email: 'teste@jest.com.br',
      password: '123456',
    });

    expect(
      createUsersServices.execute({
        name: 'Thiago',
        email: 'teste@jest.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(
      createUsersServices.execute({
        name: 'Thiago',
        email: 'teste@jest.com.br',
        password: '123456',
      }),
    ).rejects.toEqual({
      message: 'This email already exists',
      statusCode: 400,
    });
  });
});
