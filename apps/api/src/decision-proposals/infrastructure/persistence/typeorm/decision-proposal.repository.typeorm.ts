import { Injectable } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import {
  DecisionProposal,
  DecisionProposalRepository,
} from "src/decision-proposals/domain";
import { Repository as TypeOrmRepository, SelectQueryBuilder } from "typeorm";
import { DecisionProposalMapper } from "./mappers";
import { DecisionProposalTypeOrm } from "./models/decision-proposal.typeorm";
import { Repository } from "src/common/domain";

@Injectable()
export class DecisionProposalRepositoryTypeOrm
  extends Repository<DecisionProposal, DecisionProposalTypeOrm>
  implements DecisionProposalRepository
{
  constructor(
    @InjectRepository(DecisionProposalTypeOrm)
    protected readonly decisionProposalRepository: TypeOrmRepository<DecisionProposalTypeOrm>,
    eventBus: EventBus
  ) {
    super(decisionProposalRepository, eventBus, DecisionProposalMapper);
  }

  private createQueryBuilder(): SelectQueryBuilder<DecisionProposalTypeOrm> {
    return this.decisionProposalRepository.createQueryBuilder(
      "decisionProposal"
    );
  }

  async findById(id: string): Promise<DecisionProposal | null> {
    const decisionProposalEntity = await this.createQueryBuilder()
      .where("decisionProposal.id = :id", { id: id })
      .getOne();

    return decisionProposalEntity
      ? DecisionProposalMapper.toDomain(decisionProposalEntity)
      : null;
  }

  async findByUserId(userId: string): Promise<DecisionProposal[]> {
    const decisionProposalEntities = await this.createQueryBuilder()
      .where("decisionProposal.creatorId = :userId", { userId })
      .getMany();

    return decisionProposalEntities.map(DecisionProposalMapper.toDomain);
  }

  async findOneByIdOrFail(id: string): Promise<DecisionProposal> {
    const decisionProposal = await this.findById(id);

    if (!decisionProposal) {
      throw new Error("DecisionProposal not found: " + id);
    }

    return decisionProposal;
  }
}
