import { Injectable, NotFoundException } from "@nestjs/common";
import { DecisionProposal, DecisionProposalRepository } from "../../domain";

export class UpdateProposalDueDateCommand {
  constructor(
    readonly props: {
      proposalId: string;
      userId: string;
      dueDate: string;
    }
  ) {}
}

@Injectable()
export class UpdateProposalDueDateHandler {
  constructor(private readonly repository: DecisionProposalRepository) {}

  async execute(
    command: UpdateProposalDueDateCommand
  ): Promise<DecisionProposal> {
    const { proposalId, userId, dueDate } = command.props;
    const proposal = await this.repository.findById(proposalId);

    if (!proposal) throw new NotFoundException("Decision proposal not found");

    proposal.changeDueDate({
      newDueDate: dueDate,
      userId: userId,
    });

    await this.repository.save(proposal);

    return proposal;
  }
}
