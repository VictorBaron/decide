import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { UserTypeOrm } from "./core/users/infrastructure/persistence/typeorm/models/user.typeorm";
import { DecisionTypeOrm } from "./core/decisions/infrastructure/persistence/typeorm/models/decision.typeorm";
import { DecisionProposalTypeOrm } from "./core/decision-proposals/infrastructure/persistence/typeorm/models/decision-proposal.typeorm";
import { DecisionProposalOptionTypeOrm } from "./core/decision-proposals/infrastructure/persistence/typeorm/models/decision-proposal-option.typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [
    UserTypeOrm,
    DecisionTypeOrm,
    DecisionProposalTypeOrm,
    DecisionProposalOptionTypeOrm,
  ],
  migrations: ["src/migrations/*.ts"],
});
