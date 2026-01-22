import { Injectable, NotFoundException } from "@nestjs/common";
import {
  DecisionProposal,
  DecisionProposalRepository,
  CriticalityLevel,
} from "../../domain";

export class UpdateProposalCriticalityCommand {
  constructor(
    readonly props: {
      proposalId: string;
      userId: string;
      criticality: CriticalityLevel;
    }
  ) {}
}

@Injectable()
export class UpdateProposalCriticalityHandler {
  constructor(private readonly repository: DecisionProposalRepository) {}

  async execute(
    command: UpdateProposalCriticalityCommand
  ): Promise<DecisionProposal> {
    const { proposalId, userId, criticality } = command.props;
    const proposal = await this.repository.findById(proposalId);

    if (!proposal) throw new NotFoundException("Decision proposal not found");

    proposal.changeCriticality({
      newCriticality: criticality,
      userId: userId,
    });

    await this.repository.save(proposal);

    return proposal;
  }
}
