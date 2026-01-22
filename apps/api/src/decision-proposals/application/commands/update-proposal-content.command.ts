import { Injectable, NotFoundException } from "@nestjs/common";
import { DecisionProposal, DecisionProposalRepository } from "../../domain";

export class UpdateProposalContentCommand {
  constructor(
    readonly props: {
      proposalId: string;
      userId: string;
      title?: string;
      context?: string | null;
    }
  ) {}
}

@Injectable()
export class UpdateProposalContentHandler {
  constructor(private readonly repository: DecisionProposalRepository) {}

  async execute(
    command: UpdateProposalContentCommand
  ): Promise<DecisionProposal> {
    const { proposalId, userId, title, context } = command.props;
    const proposal = await this.repository.findById(proposalId);

    if (!proposal) throw new NotFoundException("Decision proposal not found");

    proposal.updateTitleOrContext({
      newTitle: title,
      newContext: context,
      userId: userId,
    });

    await this.repository.save(proposal);

    return proposal;
  }
}
