import { AggregateRootProps, AggregateRootJSON } from "src/common/domain";

export interface DecisionProps extends AggregateRootProps {
  proposalId: string;
  selectedOptionId: string;
  decidedByUserId: string;
  rationale: string | null;
}

export interface DecisionJSON extends AggregateRootJSON {
  proposalId: string;
  selectedOptionId: string;
  decidedByUserId: string;
  rationale: string | null;
}

export interface CreateDecisionProps {
  proposalId: string;
  selectedOptionId: string;
  decidedByUserId: string;
  rationale?: string | null;
}
