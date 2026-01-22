import { Injectable, NotFoundException } from "@nestjs/common";
import {
  CriticalityLevel,
  DecisionProposal,
  DecisionProposalRepository,
} from "../../domain";

export class UpdateProposalCommand {
  constructor(
    readonly props: {
      proposalId: string;
      userId: string;
      title: string;
      context: string | null;
      criticality: CriticalityLevel;
      deciderId: string;
      dueDate: Date;
    }
  ) {}
}

@Injectable()
export class UpdateProposalHandler {
  constructor(private readonly repository: DecisionProposalRepository) {}

  async execute(command: UpdateProposalCommand): Promise<DecisionProposal> {
    const { proposalId, userId, title, context } = command.props;
    const proposal = await this.repository.findById(proposalId);

    if (!proposal) throw new NotFoundException("Decision proposal not found");

    proposal.updateTitleOrContext({
      newTitle: title,
      newContext: context,
      userId: userId,
    });

    proposal.changeCriticality({
      newCriticality: command.props.criticality,
      userId: userId,
    });

    proposal.changeDueDate({
      newDueDate: command.props.dueDate,
      userId: userId,
    });

    proposal.changeDecider({
      newDeciderId: command.props.deciderId,
      userId: userId,
    });

    await this.repository.save(proposal);

    return proposal;
  }
}
