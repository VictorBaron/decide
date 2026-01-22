import { Injectable } from "@nestjs/common";
import { DecisionProposal, DecisionProposalRepository } from "../../domain";

export class GetUserProposalsQuery {
  constructor(readonly userId: string) {}
}

@Injectable()
export class GetUserProposalsHandler {
  constructor(private readonly repository: DecisionProposalRepository) {}

  async execute(query: GetUserProposalsQuery): Promise<DecisionProposal[]> {
    return this.repository.findByUserId(query.userId);
  }
}
