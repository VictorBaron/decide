import { Injectable, NotFoundException } from "@nestjs/common";
import { DecisionProposalRepository, DecisionProposal } from "../../domain";

export class AddOptionCommand {
  constructor(
    readonly props: {
      proposalId: string;
      userId: string;
      text: string;
    }
  ) {}
}

@Injectable()
export class AddOptionHandler {
  constructor(private readonly repository: DecisionProposalRepository) {}

  async execute(command: AddOptionCommand): Promise<DecisionProposal> {
    const proposal = await this.repository.findById(command.props.proposalId);

    if (!proposal) {
      throw new NotFoundException("Decision proposal not found");
    }

    proposal.addOption({ option: command.props.text });
    await this.repository.save(proposal);

    return proposal;
  }
}
