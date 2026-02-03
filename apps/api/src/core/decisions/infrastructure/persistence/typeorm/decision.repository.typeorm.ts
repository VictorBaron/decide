import { Injectable } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import {
  In,
  Repository as TypeOrmRepository,
  SelectQueryBuilder,
} from "typeorm";
import { Decision, DecisionRepository } from "src/core/decisions/domain";
import { Repository } from "src/common/domain";
import { DecisionMapper } from "./mappers";
import { DecisionTypeOrm } from "./models/decision.typeorm";

@Injectable()
export class DecisionRepositoryTypeOrm
  extends Repository<Decision, DecisionTypeOrm>
  implements DecisionRepository
{
  constructor(
    @InjectRepository(DecisionTypeOrm)
    protected readonly decisionRepository: TypeOrmRepository<DecisionTypeOrm>,
    eventBus: EventBus,
  ) {
    super(decisionRepository, eventBus, DecisionMapper);
  }

  private createQueryBuilder(): SelectQueryBuilder<DecisionTypeOrm> {
    return this.decisionRepository.createQueryBuilder("decision");
  }

  async findById(id: string): Promise<Decision | null> {
    const entity = await this.createQueryBuilder()
      .where("decision.id = :id", { id })
      .getOne();

    return entity ? DecisionMapper.toDomain(entity) : null;
  }

  async findByProposalId(proposalId: string): Promise<Decision | null> {
    const entity = await this.createQueryBuilder()
      .where("decision.proposalId = :proposalId", { proposalId })
      .getOne();

    return entity ? DecisionMapper.toDomain(entity) : null;
  }

  async findByUserId(userId: string): Promise<Decision[]> {
    const entities = await this.createQueryBuilder()
      .where("decision.decidedByUserId = :userId", { userId })
      .orderBy("decision.createdAt", "DESC")
      .getMany();

    return entities.map(DecisionMapper.toDomain);
  }

  async findByProposalIds(proposalIds: string[]): Promise<Decision[]> {
    if (proposalIds.length === 0) {
      return [];
    }

    const entities = await this.decisionRepository.find({
      where: { proposalId: In(proposalIds) },
    });

    return entities.map(DecisionMapper.toDomain);
  }
}
