import { Module } from "@nestjs/common";

import { DecisionProposalsController } from "./decision-proposals.controller";
import { DecisionProposalsService } from "./decision-proposals.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule],
  controllers: [DecisionProposalsController],
  providers: [DecisionProposalsService],
  exports: [DecisionProposalsService],
})
export class DecisionProposalsModule {}
