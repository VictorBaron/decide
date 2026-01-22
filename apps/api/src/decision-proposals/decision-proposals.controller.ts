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
} from "./dto";
import { DecisionProposalMapper } from "./infrastructure";
import { CookieAuthGuard } from "../auth/cookie-auth.guard";

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
    private readonly getUserProposalsHandler: GetUserProposalsHandler
  ) {}

  @Post()
  async create(
    @Req() req: AuthRequest,
    @Body() dto: CreateDecisionProposalDto
  ) {
    const command = new CreateProposalCommand({
      creatorId: req.user.sub,
      title: dto.title,
      context: dto.context ?? null,
      dueDate: dto.dueDate,
      criticality: dto.criticality,
      deciderId: dto.deciderId,
      options: dto.options ?? [],
    });

    const proposal = await this.createProposalHandler.execute(command);
    return DecisionProposalMapper.toResponse(proposal);
  }

  @Get()
  async findAll(@Req() req: AuthRequest) {
    const query = new GetUserProposalsQuery(req.user.sub);
    const proposals = await this.getUserProposalsHandler.execute(query);
    return proposals.map(DecisionProposalMapper.toResponse);
  }

  @Get(":id")
  async findOne(@Req() req: AuthRequest, @Param("id") id: string) {
    const query = new GetProposalQuery(id, req.user.sub);
    const proposal = await this.getProposalHandler.execute(query);
    return DecisionProposalMapper.toResponse(proposal);
  }

  @Put(":id")
  async updateContent(
    @Req() req: AuthRequest,
    @Param("id") id: string,
    @Body() dto: UpdateDecisionProposalContentDto
  ) {
    const command = new UpdateProposalContentCommand({
      proposalId: id,
      userId: req.user.sub,
      title: dto.title,
      context: dto.context,
    });

    const proposal = await this.updateProposalContentHandler.execute(command);
    return DecisionProposalMapper.toResponse(proposal);
  }

  @Put(":id")
  async updateCriticality(
    @Req() req: AuthRequest,
    @Param("id") id: string,
    @Body() dto: UpdateDecisionProposalCriticalityDto
  ) {
    const command = new UpdateProposalCriticalityCommand({
      proposalId: id,
      userId: req.user.sub,
      criticality: dto.criticality,
    });

    const proposal =
      await this.updateProposalCriticalityHandler.execute(command);
    return DecisionProposalMapper.toResponse(proposal);
  }

  @Put(":id")
  async updateDueDate(
    @Req() req: AuthRequest,
    @Param("id") id: string,
    @Body() dto: UpdateDecisionProposalDueDateDto
  ) {
    const command = new UpdateProposalDueDateCommand({
      proposalId: id,
      userId: req.user.sub,
      dueDate: dto.dueDate,
    });

    const proposal = await this.updateProposalDueDateHandler.execute(command);
    return DecisionProposalMapper.toResponse(proposal);
  }

  @Put(":id")
  async updateDecider(
    @Req() req: AuthRequest,
    @Param("id") id: string,
    @Body() dto: UpdateDecisionProposalDeciderDto
  ) {
    const command = new UpdateProposalDeciderCommand({
      proposalId: id,
      userId: req.user.sub,
      deciderId: dto.deciderId,
    });

    const proposal = await this.updateProposalDeciderHandler.execute(command);
    return DecisionProposalMapper.toResponse(proposal);
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
    @Body() dto: AddOptionDto
  ) {
    const command = new AddOptionCommand({
      proposalId: id,
      userId: req.user.sub,
      text: dto.text,
    });
    const proposal = await this.addOptionHandler.execute(command);
    return proposal.toJSON();
  }

  @Delete(":id/options/:optionId")
  async removeOption(
    @Req() req: AuthRequest,
    @Param("id") id: string,
    @Param("optionId") optionId: string
  ) {
    const command = new RemoveOptionCommand(id, optionId, req.user.sub);
    const proposal = await this.removeOptionHandler.execute(command);
    return proposal.toJSON();
  }
}
