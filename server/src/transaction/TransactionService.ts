import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

type TransactionFunction<T = void> = (manager: EntityManager) => Promise<T>;

@Injectable()
export class TransactionService {
  constructor(private entityManager: EntityManager) {}

  async transactional<T>(fn: TransactionFunction<T>): Promise<T> {
    return await this.entityManager.transactional(fn);
  }
}
