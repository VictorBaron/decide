import { AggregateRootProps, AggregateRootJSON } from "src/common/domain";
import { Criticality, CriticalityLevel, DueDate } from "../value-objects";
import { DecisionProposalOption } from "../entities/decision-proposal-option.entity";
import { User } from "src/users/domain/aggregates/user.aggregate";
import { UserJSON } from "src/users/domain";

export interface DecisionProposalProps extends AggregateRootProps {
  title: string;
  context: unknown[] | null;
  dueDate: DueDate;
  criticality: Criticality;
  creatorId: string;
  deciderId: string;
  options: DecisionProposalOption[];
  lastModifiedBy?: string;
  decided: boolean;
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
  context: unknown[] | null;
  dueDate: Date;
  criticality: Criticality;
  creatorId: string;
  deciderId: string;
  decided: boolean;
  options: DecisionProposalOptionJSON[];
  lastModifiedBy?: string;
}

export interface CreateProposalProps {
  title: string;
  context?: unknown[] | null;
  criticality: string;
  creatorId: string;
  deciderId: string;
  dueDate: Date;
  options?: string[];
}
