import { Injectable } from "@nestjs/common";
import { DecisionProposal, DecisionProposalRepository } from "../../domain";
import { Block } from "@blocknote/core";

export class CreateProposalCommand {
  constructor(
    readonly props: {
      creatorId: string;
      title: string;
      context: Block[];
      dueDate: string;
      criticality: string;
      deciderId: string;
      options: string[];
    },
  ) {}
}

@Injectable()
export class CreateProposalHandler {
  constructor(private readonly repository: DecisionProposalRepository) {}

  async execute(command: CreateProposalCommand): Promise<DecisionProposal> {
    const proposal = DecisionProposal.create({
      title: command.props.title,
      context: command.props.context,
      dueDate: new Date(command.props.dueDate),
      criticality: command.props.criticality,
      creatorId: command.props.creatorId,
      deciderId: command.props.deciderId,
      options: command.props.options,
    });

    await this.repository.save(proposal);

    return proposal;
  }
}
