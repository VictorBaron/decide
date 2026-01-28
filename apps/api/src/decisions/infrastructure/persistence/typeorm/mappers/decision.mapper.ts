import { Decision } from "src/decisions/domain";
import { DecisionJSON } from "src/decisions/domain/aggregates/types";
import { DecisionTypeOrm } from "../models/decision.typeorm";

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

  static toResponse(decision: Decision): DecisionJSON {
    return decision.toJSON();
  }
}
