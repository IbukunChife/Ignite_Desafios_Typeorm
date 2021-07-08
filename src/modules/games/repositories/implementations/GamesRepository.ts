import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[] | any> {
    return this.repository.createQueryBuilder("games")
      .where("LOWER(title) ILIKE :Title",{Title:`%${param}%`}).getMany();
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const sql = "SELECT count(*) FROM games"
    return this.repository.query(sql); // Complete usando raw querys
  }

  async findUsersByGameId(id: string): Promise<User[] | any> {
    return await this.repository
      .createQueryBuilder()
      .relation("users")
      .of(id)
      .loadMany();
  }
}