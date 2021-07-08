import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise< User | any > {
    const user = await this.repository.find({
      relations:['games'],
      where: {id: user_id}});
    return user[0];
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const sql = `SELECT * FROM users ORDER BY first_name ASC `
    return await this.repository.query(sql);
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(
      `SELECT * FROM users 
      WHERE first_name ILIKE '${first_name}' 
      OR last_name ILIKE '${last_name}' `
      ); 
  }
}
