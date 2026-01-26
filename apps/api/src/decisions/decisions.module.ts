import { Module } from "@nestjs/common";

import { DecisionsController } from "./decisions.controller";
import { AuthModule } from "../auth/auth.module";

import {
  MakeDecisionHandler,
} from "./application/commands";

import {
  GetDecisionsHandler,
  GetDecisionByProposalHandler,
  GetDecisionHandler,
} from "./application/queries";

import { DecisionPersistenceModule } from "./infrastructure/persistence/decision-persistence.module";
import { DecisionProposalsModule } from "../decision-proposals/decision-proposals.module";

@Module({
  imports: [
    AuthModule,
    DecisionPersistenceModule.use("orm"),
    DecisionProposalsModule,
  ],
  controllers: [DecisionsController],
  providers: [
    MakeDecisionHandler,
    GetDecisionsHandler,
    GetDecisionByProposalHandler,
    GetDecisionHandler,
  ],
  exports: [GetDecisionByProposalHandler],
})
export class DecisionsModule {}
