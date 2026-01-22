import { Module } from "@nestjs/common";
import { DecisionProposalRepositoryInMemory } from "./decision-proposal.repository.inmemory";
import {
  DecisionProposal,
  DecisionProposalRepository,
} from "src/decision-proposals/domain";

@Module({
  providers: [
    {
      provide: DecisionProposalRepository,
      useClass: DecisionProposalRepositoryInMemory,
    },
  ],
  exports: [DecisionProposalRepository],
})
export class InMemoryDecisionProposalPersistenceModule {}
