import { AggregateRootProps, AggregateRootJSON } from "src/common/domain";
import { Criticality, DueDate } from "../value-objects";
import { DecisionProposalOption } from "../entities/decision-proposal-option.entity";

export interface DecisionProposalProps extends AggregateRootProps {
  title: string;
  context: string | null;
  dueDate: DueDate;
  criticality: Criticality;
  creatorId: string;
  deciderId: string;
  options: DecisionProposalOption[];
  lastModifiedBy?: string;
}

export interface DecisionProposalOptionJSON {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface DecisionProposalJSON extends AggregateRootJSON {
  title: string;
  context: string | null;
  dueDate: DueDate;
  criticality: Criticality;
  creatorId: string;
  deciderId: string;
  options: DecisionProposalOptionJSON[];
  lastModifiedBy?: string;
}

export interface CreateProposalProps {
  title: string;
  context?: string | null;
  dueDate: Date | string;
  criticality: string;
  creatorId: string;
  deciderId: string;
  options?: string[];
}
