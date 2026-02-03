import { Account } from "../../../domain/aggregates/account.aggregate";
import { AccountRepository } from "../../../domain/repositories/account.repository";

export class InMemoryAccountRepository extends AccountRepository {
  private accounts: Map<string, Account> = new Map();

  async findById(id: string): Promise<Account | null> {
    return this.accounts.get(id) ?? null;
  }

  async findAll(): Promise<Account[]> {
    return Array.from(this.accounts.values());
  }

  async save(account: Account): Promise<void> {
    this.accounts.set(account.getId(), account);
  }

  async softDelete(account: Account): Promise<void> {
    this.accounts.delete(account.getId());
  }

  clear(): void {
    this.accounts.clear();
  }
}
