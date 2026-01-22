import { Module } from "@nestjs/common";

import { DecisionProposalsController } from "./decision-proposals.controller";
import { AuthModule } from "../auth/auth.module";

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
  imports: [AuthModule, DecisionProposalPersistenceModule.use("orm")],
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
})
export class DecisionProposalsModule {}
