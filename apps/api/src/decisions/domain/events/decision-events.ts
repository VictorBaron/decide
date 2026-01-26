import { DomainEvent } from "src/common/domain";

export class DecisionMadeEvent extends DomainEvent {
  readonly eventName = "decision.made";
  readonly decisionId: string;
  readonly proposalId: string;
  readonly selectedOptionId: string;
  readonly decidedByUserId: string;

  constructor({
    decisionId,
    proposalId,
    selectedOptionId,
    decidedByUserId,
  }: {
    decisionId: string;
    proposalId: string;
    selectedOptionId: string;
    decidedByUserId: string;
  }) {
    super();
    this.decisionId = decisionId;
    this.proposalId = proposalId;
    this.selectedOptionId = selectedOptionId;
    this.decidedByUserId = decidedByUserId;
  }
}
