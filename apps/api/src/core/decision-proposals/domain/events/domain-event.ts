import { DomainEvent } from "src/common/domain";

export class ProposalCreatedEvent extends DomainEvent {
  readonly eventName = "proposal.created";
  readonly proposalId: string;
  readonly creatorId: string;
  readonly deciderId: string;

  constructor({
    proposalId,
    creatorId,
    deciderId,
  }: {
    proposalId: string;
    creatorId: string;
    deciderId: string;
  }) {
    super();
    this.proposalId = proposalId;
    this.creatorId = creatorId;
    this.deciderId = deciderId;
  }
}

export class OptionAddedEvent extends DomainEvent {
  readonly eventName = "proposal.option_added";
  readonly proposalId: string;
  readonly optionId: string;

  constructor({
    proposalId,
    optionId,
  }: {
    proposalId: string;
    optionId: string;
  }) {
    super();
    this.proposalId = proposalId;
    this.optionId = optionId;
  }
}

export class OptionRemovedEvent extends DomainEvent {
  readonly eventName = "proposal.option_removed";
  readonly proposalId: string;
  readonly optionId: string;

  constructor({
    proposalId,
    optionId,
  }: {
    proposalId: string;
    optionId: string;
  }) {
    super();
    this.proposalId = proposalId;
    this.optionId = optionId;
  }
}

export class ProposalUpdatedEvent extends DomainEvent {
  readonly eventName = "proposal.updated";

  constructor(readonly proposalId: string) {
    super();
  }
}
