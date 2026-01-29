import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { Decision, DecisionRepository } from "../../domain";
import { DecisionProposalRepository } from "src/decision-proposals/domain";

export class MakeDecisionCommand {
  constructor(
    readonly props: {
      proposalId: string;
      userId: string;
      selectedOptionId: string;
      rationale?: string;
    }
  ) {}
}

@Injectable()
export class MakeDecisionHandler {
  constructor(
    private readonly decisionRepository: DecisionRepository,
    private readonly proposalRepository: DecisionProposalRepository
  ) {}

  async execute(command: MakeDecisionCommand): Promise<Decision> {
    const proposal = await this.proposalRepository.findById(
      command.props.proposalId
    );

    if (!proposal) {
      throw new NotFoundException("Decision proposal not found");
    }

    const existingDecision = await this.decisionRepository.findByProposalId(
      command.props.proposalId
    );

    if (existingDecision) {
      throw new ConflictException(
        "A decision has already been made for this proposal"
      );
    }

    const decision = proposal.decide({
      optionId: command.props.selectedOptionId,
      userId: command.props.userId,
      rationale: command.props.rationale ?? null,
    });

    await this.decisionRepository.save(decision);
    await this.proposalRepository.save(proposal);

    return decision;
  }
}
