import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  IsArray,
  ValidateNested,
  IsInt,
  Min,
} from "class-validator";
import { Type } from "class-transformer";
import { Criticality } from "@prisma/client";

export class CreateOptionDto {
  @IsString()
  @IsNotEmpty()
  text!: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number;
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

  @IsEnum(Criticality)
  criticality!: Criticality;

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
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  context?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsEnum(Criticality)
  @IsOptional()
  criticality?: Criticality;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  deciderId?: string;
}

export class AddOptionDto {
  @IsString()
  @IsNotEmpty()
  text!: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number;
}
