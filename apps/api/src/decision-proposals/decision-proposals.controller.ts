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

import { DecisionProposalsService } from "./decision-proposals.service";
import {
  CreateDecisionProposalDto,
  UpdateDecisionProposalDto,
  AddOptionDto,
} from "./dto";
import { CookieAuthGuard } from "../auth/cookie-auth.guard";

interface AuthRequest extends Request {
  user: { sub: string; email: string; name?: string };
}

@Controller("v1/decision-proposals")
@UseGuards(CookieAuthGuard)
export class DecisionProposalsController {
  constructor(private readonly service: DecisionProposalsService) {}

  @Post()
  create(@Req() req: AuthRequest, @Body() dto: CreateDecisionProposalDto) {
    return this.service.create(req.user.sub, dto);
  }

  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.service.findAllForUser(req.user.sub);
  }

  @Get(":id")
  findOne(@Req() req: AuthRequest, @Param("id") id: string) {
    return this.service.findOne(id, req.user.sub);
  }

  @Put(":id")
  update(
    @Req() req: AuthRequest,
    @Param("id") id: string,
    @Body() dto: UpdateDecisionProposalDto
  ) {
    return this.service.update(id, req.user.sub, dto);
  }

  @Delete(":id")
  remove(@Req() req: AuthRequest, @Param("id") id: string) {
    return this.service.remove(id, req.user.sub);
  }

  @Post(":id/options")
  addOption(
    @Req() req: AuthRequest,
    @Param("id") id: string,
    @Body() dto: AddOptionDto
  ) {
    return this.service.addOption(id, req.user.sub, dto);
  }

  @Delete(":id/options/:optionId")
  removeOption(
    @Req() req: AuthRequest,
    @Param("id") id: string,
    @Param("optionId") optionId: string
  ) {
    return this.service.removeOption(id, optionId, req.user.sub);
  }
}
