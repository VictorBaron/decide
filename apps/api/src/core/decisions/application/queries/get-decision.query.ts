import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { Decision, DecisionRepository } from "../../domain";
import { DecisionProposalRepository } from "src/core/decision-proposals/domain";

export class GetDecisionQuery {
  constructor(
    readonly decisionId: string,
    readonly userId: string,
  ) {}
}

@Injectable()
export class GetDecisionHandler {
  constructor(
    private readonly repository: DecisionRepository,
    private readonly proposalRepository: DecisionProposalRepository,
  ) {}

  async execute(query: GetDecisionQuery): Promise<Decision> {
    const decision = await this.repository.findById(query.decisionId);

    if (!decision) {
      throw new NotFoundException("Decision not found");
    }

    const proposal = await this.proposalRepository.findById(
      decision.getProposalId(),
    );

    if (!proposal) {
      throw new NotFoundException("Associated proposal not found");
    }

    if (!proposal.canBeAccessedBy(query.userId)) {
      throw new ForbiddenException("Access denied");
    }

    return decision;
  }
}
