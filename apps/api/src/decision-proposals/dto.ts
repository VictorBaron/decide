import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  IsArray,
  ValidateNested,
  IsInt,
} from "class-validator";
import { Type } from "class-transformer";
import { CriticalityLevel } from "./domain";

export class CreateOptionDto {
  @IsString()
  @IsNotEmpty()
  text!: string;

  @IsInt()
  @IsNotEmpty()
  order!: number;
}

export class CreateDecisionProposalDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsArray()
  context!: Block[];

  @IsDateString()
  dueDate!: string;

  @IsEnum(CriticalityLevel)
  criticality!: CriticalityLevel;

  @IsString()
  @IsNotEmpty()
  deciderId!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOptionDto)
  @IsOptional()
  options?: CreateOptionDto[];
}

export class UpdateDecisionProposalDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsArray()
  @IsOptional()
  context!: Block[];

  @IsDateString()
  dueDate!: string;

  @IsEnum(CriticalityLevel)
  criticality!: CriticalityLevel;

  @IsString()
  @IsNotEmpty()
  deciderId!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOptionDto)
  @IsOptional()
  options?: CreateOptionDto[];
}

export class UpdateDecisionProposalContentDto {
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsArray()
  @IsOptional()
  context?: unknown[];
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

import { UserSummaryDTO } from "src/common/dto";
import { Criticality } from "./domain";
import { Block } from "@blocknote/core";

export interface DecisionProposalOptionResponseDTO {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface DecisionProposalResponseDTO {
  id: string;
  title: string;
  context: unknown[] | null;
  dueDate: Date;
  criticality: CriticalityLevel;
  creator: UserSummaryDTO;
  decider: UserSummaryDTO;
  decided: boolean;
  options: DecisionProposalOptionResponseDTO[];
  lastModifiedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
