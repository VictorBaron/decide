import { RepositoryPort } from "src/common/domain/repository-port";
import { DecisionProposal } from "../aggregates/decision-proposal.aggregate";

export abstract class DecisionProposalRepository extends RepositoryPort<DecisionProposal> {
  abstract findById(id: string): Promise<DecisionProposal | null>;
  abstract findByUserId(userId: string): Promise<DecisionProposal[]>;
  abstract save(proposal: DecisionProposal): Promise<void>;
  abstract delete(proposal: DecisionProposal): Promise<void>;
}

export const DECISION_PROPOSAL_REPOSITORY = Symbol(
  "DecisionProposalRepository"
);
