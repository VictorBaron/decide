import { IsString, IsNotEmpty, IsOptional } from "class-validator";

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
