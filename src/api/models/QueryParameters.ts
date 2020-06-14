import { IsString, IsOptional, IsBoolean, IsInt } from "class-validator";

export class QueryParameters {
  @IsString()
  @IsOptional()
  sorter?: "MOST_RECENT" | "LEAST_RECENT" | "LEAST_RECENT";

  @IsInt()
  @IsOptional()
  take?: number;

  @IsInt()
  @IsOptional()
  skip?: number;
}
