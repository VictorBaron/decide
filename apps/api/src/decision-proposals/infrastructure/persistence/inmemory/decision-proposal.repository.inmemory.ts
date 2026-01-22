import {
  DecisionProposal,
  DecisionProposalRepository,
} from "src/decision-proposals/domain";

export class DecisionProposalRepositoryInMemory implements DecisionProposalRepository {
  findById(id: string): Promise<DecisionProposal | null> {
    throw new Error("Method not implemented.");
  }
  findByUserId(userId: string): Promise<DecisionProposal[]> {
    throw new Error("Method not implemented.");
  }
  private readonly decisionProposals = new Map<string, DecisionProposal>();

  async findOneById(id: string): Promise<DecisionProposal | null> {
    return this.decisionProposals.get(id) || null;
  }

  async findOneByIdOrFail(id: string): Promise<DecisionProposal> {
    const decisionProposal = await this.findOneById(id);

    if (!decisionProposal) {
      throw new Error("DecisionProposal not found: " + id);
    }

    return decisionProposal;
  }

  async save(decisionProposal: DecisionProposal): Promise<void> {
    this.decisionProposals.set(decisionProposal.id, decisionProposal);

    return;
  }

  async delete(decisionProposal: DecisionProposal): Promise<void> {
    this.decisionProposals.delete(decisionProposal.id);
  }

  async softDelete(decisionProposal: DecisionProposal): Promise<void> {
    this.decisionProposals.delete(decisionProposal.id);
  }

  flush(): void {
    this.decisionProposals.clear();
  }
}
