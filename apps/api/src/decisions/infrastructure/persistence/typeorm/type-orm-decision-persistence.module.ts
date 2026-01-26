import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DecisionRepository } from "src/decisions/domain";
import { DecisionTypeOrm } from "./models/decision.typeorm";
import { PersistenceModule } from "src/common/persistence-module";
import { DecisionRepositoryTypeOrm } from "./decision.repository.typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([DecisionTypeOrm]),
    PersistenceModule,
  ],
  providers: [
    {
      provide: DecisionRepository,
      useClass: DecisionRepositoryTypeOrm,
    },
  ],
  exports: [DecisionRepository],
})
export class TypeOrmDecisionPersistenceModule {}
