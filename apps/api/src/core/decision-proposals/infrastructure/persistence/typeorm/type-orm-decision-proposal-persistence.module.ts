import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DecisionProposalRepository } from "src/core/decision-proposals/domain";
import { DecisionProposalTypeOrm } from "./models/decision-proposal.typeorm";
import { DecisionProposalOptionTypeOrm } from "./models/decision-proposal-option.typeorm";
import { PersistenceModule } from "src/common/persistence-module";
import { DecisionProposalRepositoryTypeOrm } from "./decision-proposal.repository.typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DecisionProposalTypeOrm,
      DecisionProposalOptionTypeOrm,
    ]),
    PersistenceModule,
  ],
  providers: [
    {
      provide: DecisionProposalRepository,
      useClass: DecisionProposalRepositoryTypeOrm,
    },
  ],
  exports: [DecisionProposalRepository],
})
export class TypeOrmDecisionProposalPersistenceModule {}
