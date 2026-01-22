import {
  SoftDeletableEntity,
  SoftDeletableEntityProps,
} from "src/common/domain";
import { DecisionProposalOptionJSON } from "../aggregates/types";

export interface DecisionProposalOptionProps extends SoftDeletableEntityProps {
  text: string;
}

export class DecisionProposalOption extends SoftDeletableEntity<DecisionProposalOptionProps> {
  private text: string;
  private constructor(private props: DecisionProposalOptionProps) {
    super(props);
    this.text = props.text;
  }

  static create(text: string): DecisionProposalOption {
    if (!text || text.trim().length === 0) {
      throw new Error("Option text cannot be empty");
    }

    return new DecisionProposalOption({
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      text: text.trim(),
    });
  }

  static reconstitute(
    props: DecisionProposalOptionProps
  ): DecisionProposalOption {
    return new DecisionProposalOption(props);
  }

  getId(): string {
    return this.id;
  }

  getText(): string {
    return this.text;
  }

  public toJSON(): DecisionProposalOptionJSON {
    return {
      ...super.toJSON(),
      text: this.text,
    };
  }
}
