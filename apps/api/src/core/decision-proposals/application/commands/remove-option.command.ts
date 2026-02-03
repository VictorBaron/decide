import { Injectable, NotFoundException } from "@nestjs/common";
import { DecisionProposal, DecisionProposalRepository } from "../../domain";

export class RemoveOptionCommand {
  constructor(
    readonly props: {
      proposalId: string;
      optionId: string;
      userId: string;
    }
  ) {}
}

@Injectable()
export class RemoveOptionHandler {
  constructor(private readonly repository: DecisionProposalRepository) {}

  async execute(command: RemoveOptionCommand): Promise<DecisionProposal> {
    const { proposalId, optionId, userId } = command.props;
    const proposal = await this.repository.findById(proposalId);

    if (!proposal) {
      throw new NotFoundException("Decision proposal not found");
    }

    proposal.removeOption({ optionId, userId });
    await this.repository.save(proposal);

    return proposal;
  }
}
