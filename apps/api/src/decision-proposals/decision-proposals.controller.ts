import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Request } from "express";

import {
  CreateProposalHandler,
  CreateProposalCommand,
  UpdateProposalContentHandler,
  UpdateProposalContentCommand,
  UpdateProposalCriticalityHandler,
  UpdateProposalCriticalityCommand,
  UpdateProposalDueDateHandler,
  UpdateProposalDueDateCommand,
  UpdateProposalDeciderHandler,
  UpdateProposalDeciderCommand,
  DeleteProposalHandler,
  DeleteProposalCommand,
  AddOptionHandler,
  AddOptionCommand,
  RemoveOptionHandler,
  RemoveOptionCommand,
  GetProposalHandler,
  GetProposalQuery,
  GetUserProposalsHandler,
  GetUserProposalsQuery,
} from "./application";
import {
  CreateDecisionProposalDto,
  UpdateDecisionProposalContentDto,
  UpdateDecisionProposalCriticalityDto,
  UpdateDecisionProposalDueDateDto,
  UpdateDecisionProposalDeciderDto,
  AddOptionDto,
  DecisionProposalResponseDTO,
  UpdateDecisionProposalDto,
} from "./dto";
import { DecisionProposalMapper } from "./infrastructure";
import { DecisionProposal } from "./domain";
import { CookieAuthGuard } from "../auth/cookie-auth.guard";
import { UserRepository } from "../users/domain";
import { UserSummaryDTO } from "src/common/dto";
import { UpdateProposalCommand } from "./application/commands/update-proposal.command";

interface AuthRequest extends Request {
  user: { sub: string; email: string; name?: string };
}

@Controller("v1/decision-proposals")
@UseGuards(CookieAuthGuard)
export class DecisionProposalsController {
  constructor(
    private readonly createProposalHandler: CreateProposalHandler,
    private readonly updateProposalContentHandler: UpdateProposalContentHandler,
    private readonly updateProposalCriticalityHandler: UpdateProposalCriticalityHandler,
    private readonly updateProposalDueDateHandler: UpdateProposalDueDateHandler,
    private readonly updateProposalDeciderHandler: UpdateProposalDeciderHandler,
    private readonly deleteProposalHandler: DeleteProposalHandler,
    private readonly addOptionHandler: AddOptionHandler,
    private readonly removeOptionHandler: RemoveOptionHandler,
    private readonly getProposalHandler: GetProposalHandler,
    private readonly getUserProposalsHandler: GetUserProposalsHandler,
    private readonly userRepository: UserRepository,
  ) {}

  private async getUsersMap(
    proposals: DecisionProposal[],
  ): Promise<Map<string, UserSummaryDTO>> {
    const userIds = new Set<string>();
    for (const proposal of proposals) {
      const json = proposal.toJSON();
      userIds.add(json.creatorId);
      userIds.add(json.deciderId);
    }

    const users = await this.userRepository.findByIds([...userIds]);
    const usersMap = new Map<string, UserSummaryDTO>();
    for (const user of users) {
      usersMap.set(user.id, user.toLightJSON());
    }
    return usersMap;
  }

  private async mapToResponse(
    proposal: DecisionProposal,
  ): Promise<DecisionProposalResponseDTO> {
    const usersMap = await this.getUsersMap([proposal]);
    return DecisionProposalMapper.toResponse(proposal, usersMap);
  }

  private async mapManyToResponse(
    proposals: DecisionProposal[],
  ): Promise<DecisionProposalResponseDTO[]> {
    const usersMap = await this.getUsersMap(proposals);
    return proposals.map((p) => DecisionProposalMapper.toResponse(p, usersMap));
  }

  @Post()
  async create(
    @Req() req: AuthRequest,
    @Body() dto: CreateDecisionProposalDto,
  ) {
    const options = dto.options?.map((option) => option.text) || [];
    const command = new CreateProposalCommand({
      creatorId: req.user.sub,
      title: dto.title,
      context: dto.context ?? null,
      dueDate: dto.dueDate,
      criticality: dto.criticality,
      deciderId: dto.deciderId,
      options,
    });

    const proposal = await this.createProposalHandler.execute(command);
    return this.mapToResponse(proposal);
  }

  @Get()
  async findAll(@Req() req: AuthRequest) {
    const query = new GetUserProposalsQuery(req.user.sub);
    const proposals = await this.getUserProposalsHandler.execute(query);
    return this.mapManyToResponse(proposals);
  }

  @Get(":id")
  async findOne(@Req() req: AuthRequest, @Param("id") id: string) {
    const query = new GetProposalQuery(id, req.user.sub);
    const proposal = await this.getProposalHandler.execute(query);
    return this.mapToResponse(proposal);
  }

  @Put(":id")
  async update(
    @Req() req: AuthRequest,
    @Param("id") id: string,
    @Body() dto: UpdateDecisionProposalDto,
  ) {
    const command = new UpdateProposalCommand({
      proposalId: id,
      userId: req.user.sub,
      title: dto.title,
      context: dto.context,
      criticality: dto.criticality,
      deciderId: dto.deciderId,
      dueDate: new Date(dto.dueDate),
    });

    const proposal = await this.updateProposalContentHandler.execute(command);
    return this.mapToResponse(proposal);
  }

  @Put(":id/content")
  async updateContent(
    @Req() req: AuthRequest,
    @Param("id") id: string,
    @Body() dto: UpdateDecisionProposalContentDto,
  ) {
    const command = new UpdateProposalContentCommand({
      proposalId: id,
      userId: req.user.sub,
      title: dto.title,
      context: dto.context,
    });

    const proposal = await this.updateProposalContentHandler.execute(command);
    return this.mapToResponse(proposal);
  }

  @Put(":id/criticality")
  async updateCriticality(
    @Req() req: AuthRequest,
    @Param("id") id: string,
    @Body() dto: UpdateDecisionProposalCriticalityDto,
  ) {
    const command = new UpdateProposalCriticalityCommand({
      proposalId: id,
      userId: req.user.sub,
      criticality: dto.criticality,
    });

    const proposal =
      await this.updateProposalCriticalityHandler.execute(command);
    return this.mapToResponse(proposal);
  }

  @Put(":id/due-date")
  async updateDueDate(
    @Req() req: AuthRequest,
    @Param("id") id: string,
    @Body() dto: UpdateDecisionProposalDueDateDto,
  ) {
    const command = new UpdateProposalDueDateCommand({
      proposalId: id,
      userId: req.user.sub,
      dueDate: dto.dueDate,
    });

    const proposal = await this.updateProposalDueDateHandler.execute(command);
    return this.mapToResponse(proposal);
  }

  @Put(":id/decider")
  async updateDecider(
    @Req() req: AuthRequest,
    @Param("id") id: string,
    @Body() dto: UpdateDecisionProposalDeciderDto,
  ) {
    const command = new UpdateProposalDeciderCommand({
      proposalId: id,
      userId: req.user.sub,
      deciderId: dto.deciderId,
    });

    const proposal = await this.updateProposalDeciderHandler.execute(command);
    return this.mapToResponse(proposal);
  }

  @Delete(":id")
  async remove(@Req() req: AuthRequest, @Param("id") id: string) {
    const command = new DeleteProposalCommand(id, req.user.sub);
    await this.deleteProposalHandler.execute(command);
    return { deleted: true };
  }

  @Post(":id/options")
  async addOption(
    @Req() req: AuthRequest,
    @Param("id") id: string,
    @Body() dto: AddOptionDto,
  ) {
    const command = new AddOptionCommand({
      proposalId: id,
      userId: req.user.sub,
      text: dto.text,
    });
    const proposal = await this.addOptionHandler.execute(command);
    return this.mapToResponse(proposal);
  }

  @Delete(":id/options/:optionId")
  async removeOption(
    @Req() req: AuthRequest,
    @Param("id") id: string,
    @Param("optionId") optionId: string,
  ) {
    const command = new RemoveOptionCommand({
      proposalId: id,
      optionId,
      userId: req.user.sub,
    });
    const proposal = await this.removeOptionHandler.execute(command);
    return this.mapToResponse(proposal);
  }
}
