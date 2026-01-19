import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
  CreateDecisionProposalDto,
  UpdateDecisionProposalDto,
  AddOptionDto,
} from "./dto";

@Injectable()
export class DecisionProposalsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly includeRelations = {
    creator: { select: { id: true, email: true, name: true } },
    decider: { select: { id: true, email: true, name: true } },
    options: { orderBy: { order: "asc" as const } },
  };

  async create(creatorId: string, dto: CreateDecisionProposalDto) {
    const { options, ...proposalData } = dto;

    return this.prisma.decisionProposal.create({
      data: {
        ...proposalData,
        dueDate: new Date(dto.dueDate),
        creatorId,
        options: options?.length
          ? {
              create: options.map((opt, idx) => ({
                text: opt.text,
                order: opt.order ?? idx,
              })),
            }
          : undefined,
      },
      include: this.includeRelations,
    });
  }

  async findAllForUser(userId: string) {
    return this.prisma.decisionProposal.findMany({
      where: {
        OR: [{ creatorId: userId }, { deciderId: userId }],
      },
      include: this.includeRelations,
      orderBy: { dueDate: "asc" },
    });
  }

  async findOne(id: string, userId: string) {
    const proposal = await this.prisma.decisionProposal.findUnique({
      where: { id },
      include: this.includeRelations,
    });

    if (!proposal) {
      throw new NotFoundException("Decision proposal not found");
    }

    if (proposal.creatorId !== userId && proposal.deciderId !== userId) {
      throw new ForbiddenException("Access denied");
    }

    return proposal;
  }

  async update(id: string, userId: string, dto: UpdateDecisionProposalDto) {
    const proposal = await this.findOne(id, userId);

    if (proposal.creatorId !== userId) {
      throw new ForbiddenException("Only the creator can update this proposal");
    }

    return this.prisma.decisionProposal.update({
      where: { id },
      data: {
        ...dto,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      },
      include: this.includeRelations,
    });
  }

  async remove(id: string, userId: string) {
    const proposal = await this.findOne(id, userId);

    if (proposal.creatorId !== userId) {
      throw new ForbiddenException("Only the creator can delete this proposal");
    }

    await this.prisma.decisionProposal.delete({ where: { id } });
    return { deleted: true };
  }

  async addOption(proposalId: string, userId: string, dto: AddOptionDto) {
    const proposal = await this.findOne(proposalId, userId);

    if (proposal.creatorId !== userId) {
      throw new ForbiddenException("Only the creator can add options");
    }

    const maxOrder = await this.prisma.decisionOption.aggregate({
      where: { proposalId },
      _max: { order: true },
    });

    return this.prisma.decisionOption.create({
      data: {
        text: dto.text,
        order: dto.order ?? (maxOrder._max.order ?? -1) + 1,
        proposalId,
      },
    });
  }

  async removeOption(proposalId: string, optionId: string, userId: string) {
    const proposal = await this.findOne(proposalId, userId);

    if (proposal.creatorId !== userId) {
      throw new ForbiddenException("Only the creator can remove options");
    }

    const option = await this.prisma.decisionOption.findFirst({
      where: { id: optionId, proposalId },
    });

    if (!option) {
      throw new NotFoundException("Option not found");
    }

    await this.prisma.decisionOption.delete({ where: { id: optionId } });
    return { deleted: true };
  }
}
