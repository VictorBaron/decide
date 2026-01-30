import type { Block } from "@blocknote/core";
import type {
  Criticality,
  DecisionProposal,
  DecisionProposalDTO,
} from "./types";

export class DecisionProposalMapper {
  static toDecisionProposal(dto: DecisionProposalDTO): DecisionProposal {
    return {
      ...dto,
      context: dto.context as Block[],
      dueDate: new Date(dto.dueDate),
      criticality: dto.criticality as Criticality,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
      options: dto.options.sort((a, b) => a.order - b.order),
    };
  }
}
