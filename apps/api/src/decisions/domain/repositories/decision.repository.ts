import { RepositoryPort } from "src/common/domain/repository-port";
import { Decision } from "../aggregates/decision.aggregate";

export abstract class DecisionRepository extends RepositoryPort<Decision> {
  abstract findById(id: string): Promise<Decision | null>;
  abstract findByProposalId(proposalId: string): Promise<Decision | null>;
  abstract findByUserId(userId: string): Promise<Decision[]>;
  abstract findByProposalIds(proposalIds: string[]): Promise<Decision[]>;
  abstract save(decision: Decision): Promise<void>;
}

export const DECISION_REPOSITORY = Symbol("DecisionRepository");
