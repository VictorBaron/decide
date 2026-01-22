import { Injectable, NotFoundException } from "@nestjs/common";
import { DecisionProposalRepository } from "../../domain";

export class DeleteProposalCommand {
  constructor(
    readonly proposalId: string,
    readonly userId: string
  ) {}
}

@Injectable()
export class DeleteProposalHandler {
  constructor(private readonly repository: DecisionProposalRepository) {}

  async execute(command: DeleteProposalCommand): Promise<void> {
    const proposal = await this.repository.findById(command.proposalId);

    if (!proposal) {
      throw new NotFoundException("Decision proposal not found");
    }

    await this.repository.delete(proposal);
  }
}
