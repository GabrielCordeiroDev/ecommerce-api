import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '@modules/users/dtos/IUpdateUserDTO'
import User, { UserDocument } from '@modules/users/infra/mongoose/schemas/User'
import { IUsersRepository } from '../IUsersRepository'

export class UsersRepositoryInMemory implements IUsersRepository {
  users: UserDocument[] = []

  async findByEmail(email: string): Promise<UserDocument> {
    return this.users.find(user => user.email === email)
  }

  async create({
    name,
    email,
    password
  }: ICreateUserDTO): Promise<UserDocument> {
    const user = new User({ name, email, password })
    this.users.push(user)

    return user
  }

  async findByIdAndUpdate({
    id,
    name,
    email,
    password
  }: IUpdateUserDTO): Promise<UserDocument> {
    const user = this.users.find(user => user._id === id)
    Object.assign(user, { name, email, password })

    return user
  }
}
