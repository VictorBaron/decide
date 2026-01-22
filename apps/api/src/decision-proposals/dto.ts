import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  IsArray,
  ValidateNested,
} from "class-validator";
import { CriticalityLevel } from "./domain";

export class CreateOptionDto {
  @IsString()
  @IsNotEmpty()
  text!: string;
}

export class CreateDecisionProposalDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  context?: string;

  @IsDateString()
  dueDate!: string;

  @IsEnum(CriticalityLevel)
  criticality!: CriticalityLevel;

  @IsString()
  @IsNotEmpty()
  deciderId!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  options?: string[];
}

export class UpdateDecisionProposalContentDto {
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsString()
  context: string;
}

export class UpdateDecisionProposalCriticalityDto {
  @IsEnum(CriticalityLevel)
  criticality: CriticalityLevel;
}

export class UpdateDecisionProposalDueDateDto {
  @IsDateString()
  dueDate: string;
}

export class UpdateDecisionProposalDeciderDto {
  @IsString()
  @IsNotEmpty()
  deciderId: string;
}

export class AddOptionDto {
  @IsString()
  @IsNotEmpty()
  text!: string;
}
