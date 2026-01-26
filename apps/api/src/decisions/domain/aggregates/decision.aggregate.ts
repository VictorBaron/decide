import { AggregateRoot } from "src/common/domain";
import { DecisionMadeEvent } from "../events/decision-events";
import { CreateDecisionProps, DecisionJSON, DecisionProps } from "./types";

export class Decision extends AggregateRoot {
  private proposalId: string;
  private selectedOptionId: string;
  private decidedByUserId: string;
  private rationale: string | null;

  private constructor(props: DecisionProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: null,
    });
    this.proposalId = props.proposalId;
    this.selectedOptionId = props.selectedOptionId;
    this.decidedByUserId = props.decidedByUserId;
    this.rationale = props.rationale;
  }

  static create(props: CreateDecisionProps): Decision {
    if (!props.proposalId) {
      throw new Error("Proposal ID is required");
    }

    if (!props.selectedOptionId) {
      throw new Error("Selected option ID is required");
    }

    if (!props.decidedByUserId) {
      throw new Error("Decider user ID is required");
    }

    const now = new Date();
    const decision = new Decision({
      id: crypto.randomUUID(),
      proposalId: props.proposalId,
      selectedOptionId: props.selectedOptionId,
      decidedByUserId: props.decidedByUserId,
      rationale: props.rationale?.trim() ?? null,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });

    decision.addDomainEvent(
      new DecisionMadeEvent({
        decisionId: decision.id,
        proposalId: props.proposalId,
        selectedOptionId: props.selectedOptionId,
        decidedByUserId: props.decidedByUserId,
      })
    );

    return decision;
  }

  static reconstitute(props: DecisionProps): Decision {
    return new Decision({
      id: props.id,
      proposalId: props.proposalId,
      selectedOptionId: props.selectedOptionId,
      decidedByUserId: props.decidedByUserId,
      rationale: props.rationale,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    });
  }

  getProposalId(): string {
    return this.proposalId;
  }

  getSelectedOptionId(): string {
    return this.selectedOptionId;
  }

  getDecidedByUserId(): string {
    return this.decidedByUserId;
  }

  getRationale(): string | null {
    return this.rationale;
  }

  canBeAccessedBy(userId: string): boolean {
    return this.decidedByUserId === userId;
  }

  toJSON(): DecisionJSON {
    return {
      id: this.id,
      proposalId: this.proposalId,
      selectedOptionId: this.selectedOptionId,
      decidedByUserId: this.decidedByUserId,
      rationale: this.rationale,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: null,
    };
  }
}
