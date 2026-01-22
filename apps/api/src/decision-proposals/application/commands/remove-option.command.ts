import { Injectable, NotFoundException } from "@nestjs/common";
import { DecisionProposal, DecisionProposalRepository } from "../../domain";

export class RemoveOptionCommand {
  constructor(
    readonly proposalId: string,
    readonly optionId: string,
    readonly userId: string
  ) {}
}

@Injectable()
export class RemoveOptionHandler {
  constructor(private readonly repository: DecisionProposalRepository) {}

  async execute(command: RemoveOptionCommand): Promise<DecisionProposal> {
    const proposal = await this.repository.findById(command.proposalId);

    if (!proposal) {
      throw new NotFoundException("Decision proposal not found");
    }

    proposal.removeOption({ option: command.optionId });
    await this.repository.save(proposal);

    return proposal;
  }
}
