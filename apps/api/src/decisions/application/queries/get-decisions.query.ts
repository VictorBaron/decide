import { Injectable } from "@nestjs/common";
import { Decision, DecisionRepository } from "../../domain";

export class GetDecisionsQuery {
  constructor(readonly userId: string) {}
}

@Injectable()
export class GetDecisionsHandler {
  constructor(private readonly repository: DecisionRepository) {}

  async execute(query: GetDecisionsQuery): Promise<Decision[]> {
    return this.repository.findByUserId(query.userId);
  }
}
