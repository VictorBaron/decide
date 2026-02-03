import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserRepository } from "src/core/users/domain";
import { PersistenceModule } from "src/common/persistence-module";
import { UserTypeOrm } from "./models/user.typeorm";
import { UserRepositoryTypeOrm } from "./user.repository.typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrm]), PersistenceModule],
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryTypeOrm,
    },
  ],
  exports: [UserRepository],
})
export class TypeOrmUserPersistenceModule {}
