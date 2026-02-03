import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { DecisionProposal, DecisionProposalRepository } from "../../domain";

export class GetProposalQuery {
  constructor(
    readonly proposalId: string,
    readonly userId: string
  ) {}
}

@Injectable()
export class GetProposalHandler {
  constructor(private readonly repository: DecisionProposalRepository) {}

  async execute(query: GetProposalQuery): Promise<DecisionProposal> {
    const proposal = await this.repository.findById(query.proposalId);

    if (!proposal) {
      throw new NotFoundException("Decision proposal not found");
    }

    if (!proposal.canBeAccessedBy(query.userId)) {
      throw new ForbiddenException("Access denied");
    }

    return proposal;
  }
}
