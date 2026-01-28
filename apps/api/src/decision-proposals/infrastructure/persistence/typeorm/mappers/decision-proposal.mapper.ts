import {
  DecisionProposal,
  DecisionProposalOption,
  Criticality,
  DueDate,
} from "src/decision-proposals/domain";
import { DecisionProposalJSON } from "src/decision-proposals/domain/aggregates/types";
import { DecisionProposalTypeOrm } from "../models/decision-proposal.typeorm";
import { DecisionProposalOptionTypeOrm } from "../models/decision-proposal-option.typeorm";

export class DecisionProposalMapper {
  static toDomain(raw: DecisionProposalTypeOrm): DecisionProposal {
    const options = raw.options
      .sort((a, b) => a.order - b.order)
      .map((opt) =>
        DecisionProposalOption.reconstitute({
          id: opt.id,
          createdAt: opt.createdAt,
          updatedAt: opt.updatedAt,
          deletedAt: null,
          text: opt.text,
        })
      );

    return DecisionProposal.reconstitute({
      id: raw.id,
      title: raw.title,
      context: raw.context,
      dueDate: new DueDate(new Date(raw.dueDate)),
      criticality: Criticality.create(raw.criticality),
      creatorId: raw.creatorId,
      deciderId: raw.deciderId,
      options,
      decided: raw.decided,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: null,
    });
  }

  static toPersistence(proposal: DecisionProposal): DecisionProposalTypeOrm {
    const jsonProposal = proposal.toJSON();
    return DecisionProposalTypeOrm.build({
      id: jsonProposal.id,
      title: jsonProposal.title,
      context: jsonProposal.context,
      creatorId: jsonProposal.creatorId,
      deciderId: jsonProposal.deciderId,
      dueDate: jsonProposal.dueDate,
      decided: jsonProposal.decided,
      criticality: jsonProposal.criticality.getValue(),
      createdAt: jsonProposal.createdAt,
      updatedAt: jsonProposal.updatedAt,
      deletedAt: null,
      options: jsonProposal.options.map((option, index) =>
        DecisionProposalOptionTypeOrm.build({
          id: option.id,
          text: option.text,
          order: index,
          proposalId: jsonProposal.id,
          createdAt: option.createdAt,
          updatedAt: option.updatedAt,
        })
      ),
    });
  }

  static toResponse(proposal: DecisionProposal): DecisionProposalJSON {
    return proposal.toJSON();
  }
}
