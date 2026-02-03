import { Injectable, NotFoundException } from "@nestjs/common";
import { DecisionProposal, DecisionProposalRepository } from "../../domain";

export class UpdateProposalDeciderCommand {
  constructor(
    readonly props: {
      proposalId: string;
      userId: string;
      deciderId: string;
    }
  ) {}
}

@Injectable()
export class UpdateProposalDeciderHandler {
  constructor(private readonly repository: DecisionProposalRepository) {}

  async execute(
    command: UpdateProposalDeciderCommand
  ): Promise<DecisionProposal> {
    const { proposalId, userId, deciderId } = command.props;
    const proposal = await this.repository.findById(proposalId);

    if (!proposal) throw new NotFoundException("Decision proposal not found");

    proposal.changeDecider({
      newDeciderId: deciderId,
      userId: userId,
    });

    await this.repository.save(proposal);

    return proposal;
  }
}
