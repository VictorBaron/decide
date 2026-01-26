import { Injectable } from "@nestjs/common";
import { Decision, DecisionRepository } from "../../domain";

export class GetDecisionByProposalQuery {
  constructor(readonly proposalId: string) {}
}

@Injectable()
export class GetDecisionByProposalHandler {
  constructor(private readonly repository: DecisionRepository) {}

  async execute(query: GetDecisionByProposalQuery): Promise<Decision | null> {
    return this.repository.findByProposalId(query.proposalId);
  }
}
