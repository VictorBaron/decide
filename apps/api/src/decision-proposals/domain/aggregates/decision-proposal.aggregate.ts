import { Criticality, DecisionProposalOption, DueDate } from "../value-objects";
import {
  ProposalCreatedEvent,
  ProposalUpdatedEvent,
  OptionAddedEvent,
  OptionRemovedEvent,
} from "../events";
import { AggregateRoot } from "src/common/domain";
import { DecisionOptionsCollection } from "../decision-options.collection";
import {
  CreateProposalProps,
  DecisionProposalJSON,
  DecisionProposalProps,
} from "./types";
import { Decision } from "src/decisions/domain";
import { ForbiddenException } from "@nestjs/common/exceptions/forbidden.exception";

export class DecisionProposal extends AggregateRoot {
  private title: string;
  private context: string | null;
  private dueDate: DueDate;
  private criticality: Criticality;
  private readonly creatorId: string;
  private deciderId: string;
  private decided: boolean;
  private options: DecisionOptionsCollection;
  private lastModifiedBy?: string;

  private constructor(props: DecisionProposalProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: null,
    });
    this.title = props.title;
    this.context = props.context;
    this.dueDate = props.dueDate;
    this.criticality = props.criticality;
    this.creatorId = props.creatorId;
    this.deciderId = props.deciderId;
    this.decided = props.decided;
    this.options = new DecisionOptionsCollection(props.options);
    this.lastModifiedBy = props.lastModifiedBy;
  }

  static create(props: CreateProposalProps): DecisionProposal {
    if (!props.title || props.title.trim().length === 0) {
      throw new Error("Title cannot be empty");
    }

    const now = new Date();
    const proposal = new DecisionProposal({
      id: crypto.randomUUID(),
      title: props.title.trim(),
      context: props.context?.trim() ?? null,
      dueDate: DueDate.create(props.dueDate),
      criticality: Criticality.create(props.criticality),
      creatorId: props.creatorId,
      deciderId: props.deciderId,
      decided: false,
      options: props.options?.map(DecisionProposalOption.create) ?? [],
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });

    proposal.addDomainEvent(
      new ProposalCreatedEvent({
        proposalId: proposal.id,
        creatorId: props.creatorId,
        deciderId: props.deciderId,
      })
    );

    return proposal;
  }

  static reconstitute(props: DecisionProposalProps): DecisionProposal {
    return new DecisionProposal({
      id: props.id,
      title: props.title,
      context: props.context,
      dueDate: props.dueDate,
      criticality: props.criticality,
      creatorId: props.creatorId,
      deciderId: props.deciderId,
      decided: props.decided,
      options: props.options,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      lastModifiedBy: props.lastModifiedBy,
      deletedAt: props.deletedAt,
    });
  }

  private updateDecision({ userId }: { userId: string }): void {
    this.updatedAt = new Date();
    this.lastModifiedBy = userId;
    this.addDomainEvent(new ProposalUpdatedEvent(this.id));
  }

  changeDueDate({
    newDueDate,
    userId,
  }: {
    newDueDate: Date | string;
    userId: string;
  }): void {
    this.dueDate = DueDate.create(newDueDate);
    this.updateDecision({ userId });
  }

  changeCriticality({
    newCriticality,
    userId,
  }: {
    newCriticality: string;
    userId: string;
  }): void {
    this.criticality = Criticality.create(newCriticality);
    this.updateDecision({ userId });
  }

  updateTitleOrContext({
    newTitle,
    newContext,
    userId,
  }: {
    newTitle?: string;
    newContext?: string | null;
    userId: string;
  }): void {
    const title = newTitle?.trim();
    if (title) {
      this.title = title;
    }

    if (newContext !== undefined) {
      this.context = newContext?.trim() ?? null;
    }

    this.updateDecision({ userId });
  }

  changeDecider({
    newDeciderId,
    userId,
  }: {
    newDeciderId: string;
    userId: string;
  }): void {
    this.deciderId = newDeciderId;
    this.updateDecision({ userId });
  }

  addOption({ option, userId }: { option: string; userId: string }): void {
    const newOption = this.options.addNewOption(option);
    this.updateDecision({ userId });
    this.addDomainEvent(
      new OptionAddedEvent({
        proposalId: this.id,
        optionId: newOption.getText(),
      })
    );
  }

  removeOption({
    optionId,
    userId,
  }: {
    optionId: string;
    userId: string;
  }): void {
    this.options.removeOption(optionId);
    this.updateDecision({ userId });
    this.addDomainEvent(
      new OptionRemovedEvent({ proposalId: this.id, optionId })
    );
  }

  canBeAccessedBy(userId: string): boolean {
    return this.creatorId === userId || this.deciderId === userId;
  }

  canBeModifiedBy(userId: string): boolean {
    return this.creatorId === userId;
  }

  getId(): string {
    return this.id;
  }

  canDecide(userId: string): boolean {
    return this.deciderId === userId;
  }

  decide({ userId, optionId, rationale }: { userId: string; optionId: string; rationale: string | null }): Decision {
    if (!this.canDecide(userId)) {
      throw new ForbiddenException(
        "Only the designated decider can make a decision"
      );
    }
    const optionExists = this.options.exists(optionId);
    if (!optionExists) {
      throw new Error("Selected option does not exist in this proposal");
    }
    return Decision.create({
      proposalId: this.id,
      selectedOptionId: optionId,
      decidedByUserId: userId,
      rationale,
    });
  }

  toJSON(): DecisionProposalJSON {
    return {
      id: this.id,
      title: this.title,
      context: this.context,
      dueDate: this.dueDate.getDate(),
      decided: this.decided,
      criticality: this.criticality,
      creatorId: this.creatorId,
      deciderId: this.deciderId,
      options: this.options.toJSON(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      lastModifiedBy: this.lastModifiedBy,
      deletedAt: null,
    };
  }
}
