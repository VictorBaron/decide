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
import { MakeDecisionDto, DecisionResponseDTO } from "./dto";
import { Decision } from "./domain";
import { DecisionMapper } from "./infrastructure";
import { CookieAuthGuard } from "../auth/cookie-auth.guard";
import { UserRepository } from "../users/domain";
import { UserSummaryDTO } from "src/common/dto";

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
    private readonly getDecisionByProposalHandler: GetDecisionByProposalHandler,
    private readonly userRepository: UserRepository
  ) {}

  private async getUsersMap(
    decisions: Decision[]
  ): Promise<Map<string, UserSummaryDTO>> {
    const userIds = new Set<string>();
    for (const decision of decisions) {
      const json = decision.toJSON();
      userIds.add(json.decidedByUserId);
    }

    const users = await this.userRepository.findByIds([...userIds]);
    const usersMap = new Map<string, UserSummaryDTO>();
    for (const user of users) {
      usersMap.set(user.id, user.toLightJSON());
    }
    return usersMap;
  }

  private async mapToResponse(
    decision: Decision
  ): Promise<DecisionResponseDTO> {
    const usersMap = await this.getUsersMap([decision]);
    return DecisionMapper.toResponse(decision, usersMap);
  }

  private async mapManyToResponse(
    decisions: Decision[]
  ): Promise<DecisionResponseDTO[]> {
    const usersMap = await this.getUsersMap(decisions);
    return decisions.map((d) => DecisionMapper.toResponse(d, usersMap));
  }

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
    return this.mapToResponse(decision);
  }

  @Get()
  async getDecisions(@Req() req: AuthRequest) {
    const query = new GetDecisionsQuery(req.user.sub);
    const decisions = await this.getDecisionsHandler.execute(query);
    return this.mapManyToResponse(decisions);
  }

  @Get("by-proposal/:proposalId")
  async getDecisionByProposal(
    @Req() req: AuthRequest,
    @Param("proposalId") proposalId: string
  ) {
    const query = new GetDecisionByProposalQuery(proposalId);
    const decision = await this.getDecisionByProposalHandler.execute(query);
    if (!decision) return null;
    return this.mapToResponse(decision);
  }

  @Get(":id")
  async getDecision(@Req() req: AuthRequest, @Param("id") id: string) {
    const query = new GetDecisionQuery(id, req.user.sub);
    const decision = await this.getDecisionHandler.execute(query);
    return this.mapToResponse(decision);
  }
}
