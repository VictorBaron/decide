import { DecisionProposalOptionJSON } from "./aggregates/types";
import { DecisionProposalOption } from "./entities/decision-proposal-option.entity";

export class DecisionOptionsCollection {
  private options: DecisionProposalOption[] = [];

  constructor(options: DecisionProposalOption[]) {
    this.options = options;
  }

  static create(optionsText: string[]): DecisionOptionsCollection {
    const collection = new DecisionOptionsCollection([]);
    optionsText.forEach((text) => collection.addNewOption(text));
    return collection;
  }

  public addNewOption(newOption: string): DecisionProposalOption {
    const existingOption = this.options.find(
      (o) => o.getText() === option.getText()
    );
    if (existingOption) {
      throw new Error("Option already exists");
    }

    const option = DecisionProposalOption.create(newOption);

    this.options.push(option);

    return option;
  }

  public removeOption(optionId: string): void {
    const index = this.options.findIndex((o) => o.getId() === optionId);
    if (index === -1) {
      throw new Error("Option not found");
    }
    this.options.splice(index, 1);
  }

  public exists(optionId: string): boolean {
    return this.options.some((option) => option.getId() === optionId);
  }

  public toJSON(): DecisionProposalOptionJSON[] {
    return this.options.map((o) => o.toJSON());
  }
}
