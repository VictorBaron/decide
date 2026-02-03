import { Module } from "@nestjs/common";

import { DecisionsController } from "./decisions.controller";
import { UsersModule } from "../users/users.module";

import { MakeDecisionHandler } from "./application/commands";

import {
  GetDecisionsHandler,
  GetDecisionByProposalHandler,
  GetDecisionHandler,
} from "./application/queries";

import { DecisionPersistenceModule } from "./infrastructure/persistence/decision-persistence.module";
import { AuthModule } from "src/auth/auth.module";
import { DecisionProposalPersistenceModule } from "../decision-proposals/infrastructure/persistence/decision-proposal-persistence.module";
import { UserPersistenceModule } from "../users/infrastructure";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DecisionPersistenceModule.use("orm"),
    DecisionProposalPersistenceModule.use("orm"),
    UserPersistenceModule.use("orm"),
  ],
  controllers: [DecisionsController],
  providers: [
    MakeDecisionHandler,
    GetDecisionsHandler,
    GetDecisionByProposalHandler,
    GetDecisionHandler,
  ],
  exports: [],
})
export class DecisionsModule {}
