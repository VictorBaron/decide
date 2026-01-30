import type { Block } from "@blocknote/core";

export type Criticality = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface DecisionOption {
  id: string;
  text: string;
  order: number;
  proposalId: string;
  createdAt: string;
}

export interface DecisionProposal {
  id: string;
  title: string;
  context: Block[];
  dueDate: Date;
  criticality: Criticality;
  creator: User;
  decider: User;
  options: DecisionOption[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DecisionProposalDTO {
  id: string;
  title: string;
  context: unknown[];
  dueDate: string;
  criticality: string;
  creator: User;
  decider: User;
  options: DecisionOption[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateDecisionProposalInput {
  title: string;
  context?: Block[];
  dueDate: Date;
  criticality: Criticality;
  deciderId: string;
  options?: { text: string; order?: number }[];
}

export interface UpdateDecisionProposalInput {
  title?: string;
  context?: Block[];
  dueDate?: Date;
  criticality?: Criticality;
  deciderId?: string;
}

export interface AddOptionInput {
  text: string;
  order?: number;
}
