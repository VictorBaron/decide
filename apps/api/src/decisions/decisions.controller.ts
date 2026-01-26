import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Request } from "express";

import {
  MakeDecisionHandler,
  MakeDecisionCommand,
  GetDecisionsHandler,
  GetDecisionsQuery,
  GetDecisionHandler,
  GetDecisionQuery,
  GetDecisionByProposalHandler,
  GetDecisionByProposalQuery,
} from "./application";
import { MakeDecisionDto } from "./dto";
import { DecisionMapper } from "./infrastructure";
import { CookieAuthGuard } from "../auth/cookie-auth.guard";

interface AuthRequest extends Request {
  user: { sub: string; email: string; name?: string };
}

@Controller("v1/decisions")
@UseGuards(CookieAuthGuard)
export class DecisionsController {
  constructor(
    private readonly makeDecisionHandler: MakeDecisionHandler,
    private readonly getDecisionsHandler: GetDecisionsHandler,
    private readonly getDecisionHandler: GetDecisionHandler,
    private readonly getDecisionByProposalHandler: GetDecisionByProposalHandler
  ) {}

  @Post("make")
  async makeDecision(@Req() req: AuthRequest, @Body() dto: MakeDecisionDto) {
    console.log("DecisionsController.makeDecision called with dto:", dto);
    const command = new MakeDecisionCommand({
      proposalId: dto.proposalId,
      userId: req.user.sub,
      selectedOptionId: dto.selectedOptionId,
      rationale: dto.rationale,
    });

    const decision = await this.makeDecisionHandler.execute(command);
    return DecisionMapper.toResponse(decision);
  }

  @Get()
  async getDecisions(@Req() req: AuthRequest) {
    const query = new GetDecisionsQuery(req.user.sub);
    const decisions = await this.getDecisionsHandler.execute(query);
    return decisions.map(DecisionMapper.toResponse);
  }

  @Get("by-proposal/:proposalId")
  async getDecisionByProposal(
    @Req() req: AuthRequest,
    @Param("proposalId") proposalId: string
  ) {
    const query = new GetDecisionByProposalQuery(proposalId);
    const decision = await this.getDecisionByProposalHandler.execute(query);
    return decision ? DecisionMapper.toResponse(decision) : null;
  }

  @Get(":id")
  async getDecision(@Req() req: AuthRequest, @Param("id") id: string) {
    const query = new GetDecisionQuery(id, req.user.sub);
    const decision = await this.getDecisionHandler.execute(query);
    return DecisionMapper.toResponse(decision);
  }
}
