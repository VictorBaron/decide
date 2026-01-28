import { DomainEvent } from "src/common/domain";
import { Decision } from "../aggregates";

export class DecisionMadeEvent extends DomainEvent {
  readonly eventName = "decision.made";
  readonly decision: Decision;

  constructor({ decision }: { decision: Decision }) {
    super();
    this.decision = decision;
  }
}
