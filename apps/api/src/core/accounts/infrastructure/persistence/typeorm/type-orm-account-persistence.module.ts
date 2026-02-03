import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AccountRepository, MemberRepository } from "src/core/accounts/domain";
import { PersistenceModule } from "src/common/persistence-module";
import { AccountTypeOrm } from "./models/account.typeorm";
import { MemberTypeOrm } from "./models/member.typeorm";
import { AccountRepositoryTypeOrm } from "./account.repository.typeorm";
import { MemberRepositoryTypeOrm } from "./member.repository.typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountTypeOrm, MemberTypeOrm]),
    PersistenceModule,
  ],
  providers: [
    {
      provide: AccountRepository,
      useClass: AccountRepositoryTypeOrm,
    },
    {
      provide: MemberRepository,
      useClass: MemberRepositoryTypeOrm,
    },
  ],
  exports: [AccountRepository, MemberRepository],
})
export class TypeOrmAccountPersistenceModule {}
