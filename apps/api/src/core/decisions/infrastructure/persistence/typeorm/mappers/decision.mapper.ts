import { Decision } from "src/core/decisions/domain";
import { DecisionJSON } from "src/core/decisions/domain/aggregates/types";
import { DecisionResponseDTO } from "src/core/decisions/dto";
import { DecisionTypeOrm } from "../models/decision.typeorm";
import { UserSummaryDTO } from "src/common/dto";

export class DecisionMapper {
  static toDomain(raw: DecisionTypeOrm): Decision {
    return Decision.reconstitute({
      id: raw.id,
      proposalId: raw.proposalId,
      selectedOptionId: raw.selectedOptionId,
      decidedByUserId: raw.decidedByUserId,
      rationale: raw.rationale,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: null,
    });
  }

  static toPersistence(decision: Decision): DecisionTypeOrm {
    const json = decision.toJSON();
    return DecisionTypeOrm.build({
      id: json.id,
      proposalId: json.proposalId,
      selectedOptionId: json.selectedOptionId,
      decidedByUserId: json.decidedByUserId,
      rationale: json.rationale,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
    });
  }

  static toResponse(
    decision: Decision,
    users: Map<string, UserSummaryDTO>,
  ): DecisionResponseDTO {
    const json = decision.toJSON();
    const decidedBy = users.get(json.decidedByUserId);

    if (!decidedBy) {
      throw new Error("User not found for decision response mapping");
    }

    return {
      id: json.id,
      proposalId: json.proposalId,
      selectedOptionId: json.selectedOptionId,
      decidedBy,
      rationale: json.rationale,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
      deletedAt: json.deletedAt,
    };
  }
}
