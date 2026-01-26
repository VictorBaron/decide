import type { DecisionProposal, DecisionOption } from "../decision-proposals/types";

export interface Decision {
  id: string;
  proposalId: string;
  selectedOptionId: string;
  decidedByUserId: string;
  rationale: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DecisionWithDetails extends Decision {
  proposal?: DecisionProposal;
  selectedOption?: DecisionOption;
}

export interface MakeDecisionInput {
  proposalId: string;
  selectedOptionId: string;
  rationale?: string;
}
