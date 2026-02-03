import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { UserSummaryDTO } from "src/common/dto";

export class MakeDecisionDto {
  @IsString()
  @IsNotEmpty()
  proposalId!: string;

  @IsString()
  @IsNotEmpty()
  selectedOptionId!: string;

  @IsString()
  @IsOptional()
  rationale?: string;
}

export interface DecisionResponseDTO {
  id: string;
  proposalId: string;
  selectedOptionId: string;
  decidedBy: UserSummaryDTO;
  rationale: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
