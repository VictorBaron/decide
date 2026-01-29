import { Module } from "@nestjs/common";

import { DecisionProposalsController } from "./decision-proposals.controller";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";

// Application layer - Commands
import {
  CreateProposalHandler,
  UpdateProposalContentHandler,
  UpdateProposalCriticalityHandler,
  UpdateProposalDueDateHandler,
  UpdateProposalDeciderHandler,
  DeleteProposalHandler,
  AddOptionHandler,
  RemoveOptionHandler,
} from "./application/commands";

// Application layer - Queries
import {
  GetProposalHandler,
  GetUserProposalsHandler,
} from "./application/queries";

import { DecisionProposalPersistenceModule } from "./infrastructure/persistence/decision-proposal-persistence.module";

@Module({
  imports: [AuthModule, UsersModule, DecisionProposalPersistenceModule.use("orm")],
  controllers: [DecisionProposalsController],
  providers: [
    // Commands
    CreateProposalHandler,
    UpdateProposalContentHandler,
    UpdateProposalCriticalityHandler,
    UpdateProposalDueDateHandler,
    UpdateProposalDeciderHandler,
    DeleteProposalHandler,
    AddOptionHandler,
    RemoveOptionHandler,
    // Queries
    GetProposalHandler,
    GetUserProposalsHandler,
  ],
  exports: [DecisionProposalPersistenceModule.use("orm")],
})
export class DecisionProposalsModule {}
