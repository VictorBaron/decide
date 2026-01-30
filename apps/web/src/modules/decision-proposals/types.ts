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
  context?: Block[];
  dueDate: string;
  criticality: Criticality;
  creator: User;
  decider: User;
  options: DecisionOption[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateDecisionProposalInput {
  title: string;
  context?: Block[];
  dueDate: string;
  criticality: Criticality;
  deciderId: string;
  options?: { text: string; order?: number }[];
}

export interface UpdateDecisionProposalInput {
  title?: string;
  context?: Block[];
  dueDate?: string;
  criticality?: Criticality;
  deciderId?: string;
}

export interface AddOptionInput {
  text: string;
  order?: number;
}
