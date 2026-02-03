import { RepositoryPort } from "src/common/domain/repository-port";
import { Account } from "../aggregates/account.aggregate";

export abstract class AccountRepository extends RepositoryPort<Account> {
  abstract findById(id: string): Promise<Account | null>;
  abstract findAll(): Promise<Account[]>;
  abstract save(account: Account): Promise<void>;
  abstract softDelete(account: Account): Promise<void>;
}
